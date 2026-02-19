import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { POST, GET } from '../services/httpMethods';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../services/httpEndpoint';
import { setToken, removeToken, setUser, getUser, removeUser, getToken } from '../utils/storage';

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
    // Normalize role to lowercase so role checks are consistent across app
    let normalized = userObj;
    if (userObj && userObj.role) {
      normalized = { ...userObj, role: String(userObj.role).toLowerCase() };
    }

    if (normalized) setUser(normalized);
    setUserState(normalized || null);
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

      // persist user + token
      handleSetUser(userObj, token);
      // ensure axios header for immediate requests
      // Ensure axios default header is set for immediate subsequent requests
      try {
        if (token) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
          // eslint-disable-next-line no-console
          console.log('[auth] token set (masked):', `${String(token).slice(0, 6)}...`);
        } else {
          // eslint-disable-next-line no-console
          console.log('[auth] no token returned from login; may be cookie-based auth');
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[auth] error setting axios header', e);
      }
      setLoading(false);
      return { success: true, user: userObj };
    } catch (err) {
      setLoading(false);
      // Log full error for debugging
      // eslint-disable-next-line no-console
      console.error('[auth][login][error]', err);
      const message = err?.response?.data?.message || err?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      // diagnostic: log intent and stored token
      // eslint-disable-next-line no-console
      console.log('[auth][fetchMe] calling', ENDPOINT.AUTH.ME, 'token(masked)=', String(getToken()).slice(0, 6) + '...');
      const response = await GET(ENDPOINT.AUTH.ME);
      const payload = response.data ?? response;
      // Backend sometimes wraps the user inside payload.data.user — unwrap it safely
      let userObj = payload.user ?? payload?.data?.user ?? payload?.data ?? payload;
      if (userObj && typeof userObj === 'object' && userObj.user) {
        userObj = userObj.user;
      }
      // eslint-disable-next-line no-console
      console.log('[auth][fetchMe] success - resolved user:', userObj, 'raw payload:', payload);
      handleSetUser(userObj, null);
      setLoading(false);
      return { success: true, user: userObj };
    } catch (err) {
      setLoading(false);
      // If unauthorized, clear local auth
      // eslint-disable-next-line no-console
      console.error('[auth][fetchMe][error]', {
        message: err?.message,
        status: err?.response?.status,
        url: err?.config?.url,
        responseData: err?.response?.data,
      });

      if (err?.response?.status === 401) {
        removeToken();
        removeUser();
        setUserState(null);
        setIsAuthenticated(false);
      }
      const message = err?.response?.data?.message || err?.message || 'Failed to fetch profile';
      // Do not always toast on fetchMe; prefer console diagnostics for now
      // toast.error(message);
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
    const token = getToken();

    // Only attempt to fetch profile if we have a token but no user stored
    if (!existingUser && token) {
      const tryFetch = async () => {
        
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
