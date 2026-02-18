import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { POST, GET } from '../services/httpMethods';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../services/httpEndpoint';
import { setToken, removeToken, setUser, getUser, removeUser } from '../utils/storage';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PROVIDER: 'provider',
  COACH: 'coach',
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getUser()));
  const [loading, setLoading] = useState(false);

  const handleSetUser = (userObj, token) => {
    if (token) setToken(token);
    if (userObj) setUser(userObj);
    setUserState(userObj || null);
    setIsAuthenticated(Boolean(userObj));
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await POST(ENDPOINT.AUTH.LOGIN, { email, password });
      const payload = response.data ?? response;

      // Accept common shapes: { token, user } or { accessToken, data: { user } } or { token, user: { ... } }
      const token = payload.token || payload.accessToken || payload?.data?.token || null;
      const userObj = payload.user || payload?.data?.user || payload?.data || null;

      if (!token && !userObj) {
        setLoading(false);
        const msg = 'Invalid login response from server';
        toast.error(msg);
        return { success: false, message: msg };
      }

      handleSetUser(userObj, token);
      setLoading(false);
      return { success: true, user: userObj };
    } catch (err) {
      setLoading(false);
      const message = err?.response?.data?.message || err?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GET(ENDPOINT.AUTH.ME);
      const payload = response.data ?? response;
      const userObj = payload.user || payload?.data || payload;
      handleSetUser(userObj, null);
      setLoading(false);
      return { success: true, user: userObj };
    } catch (err) {
      setLoading(false);
      // If unauthorized, clear local auth
      if (err?.response?.status === 401) {
        removeToken();
        removeUser();
        setUserState(null);
        setIsAuthenticated(false);
      }
      const message = err?.response?.data?.message || err?.message || 'Failed to fetch profile';
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      // Best-effort server logout; ignore network errors but still clear local state
      await POST(ENDPOINT.AUTH.LOGOUT, {});
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Logout failed';
      toast.error(message);
    } finally {
      removeToken();
      removeUser();
      setUserState(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  // On mount, if token exists but no user, try to fetch profile
  useEffect(() => {
    const existingUser = getUser();
    if (!existingUser) {
      const tryFetch = async () => {
        // If axiosInstance has token via storage, fetch me
        try {
          await fetchMe();
        } catch (e) {
          // noop
        }
      };
      tryFetch();
    }
  }, [fetchMe]);

  const hasRole = (role) => user?.role === role;
  const hasAnyRole = (roles = []) => roles.includes(user?.role);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, fetchMe, hasRole, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
