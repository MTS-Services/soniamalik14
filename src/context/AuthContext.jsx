import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Demo user credentials
const DEMO_USER = {
  username: 'player',
  password: 'demo123',
  userData: {
    id: 1,
    username: 'player',
    email: 'player@essahub.com',
    name: 'Demo Player',
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  // Demo login function
  const login = (username, password) => {
    // Validate demo credentials
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      setUser(DEMO_USER.userData);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(DEMO_USER.userData));
      return { success: true, message: 'Login successful!' };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
