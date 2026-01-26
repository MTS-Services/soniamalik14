import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Role constants
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PROVIDER: 'provider',
  COACH: 'coach',
};

// Common password for all demo accounts
const COMMON_PASSWORD = 'demo123';

// Demo users with different roles
const DEMO_USERS = [
  {
    email: 'admin@essahub.com',
    password: COMMON_PASSWORD,
    role: ROLES.ADMIN,
    userData: {
      id: 1,
      email: 'admin@essahub.com',
      name: 'Admin User',
      role: ROLES.ADMIN,
    }
  },
  {
    email: 'provider@essahub.com',
    password: COMMON_PASSWORD,
    role: ROLES.PROVIDER,
    userData: {
      id: 2,
      email: 'provider@essahub.com',
      name: 'Service Provider',
      role: ROLES.PROVIDER,
    }
  },
  {
    email: 'coach@essahub.com',
    password: COMMON_PASSWORD,
    role: ROLES.COACH,
    userData: {
      id: 3,
      email: 'coach@essahub.com',
      name: 'Club Coach',
      role: ROLES.COACH,
    }
  },
  {
    email: 'user@essahub.com',
    password: COMMON_PASSWORD,
    role: ROLES.USER,
    userData: {
      id: 4,
      email: 'user@essahub.com',
      name: 'Regular User',
      role: ROLES.USER,
    }
  },
];

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

  // Role-based login function
  const login = (email, password) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.userData);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(foundUser.userData));
      return { success: true, message: 'Login successful!', role: foundUser.role };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    hasAnyRole,
    ROLES,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // If context is missing, warn (helps during development) and return a safe fallback
    // This prevents the whole app from crashing if a component is rendered outside the provider.
    // Ideally, AuthProvider should wrap the app (see `src/main.jsx`).
    // eslint-disable-next-line no-console
    console.warn('useAuth called outside of AuthProvider - returning fallback auth object');
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      login: () => ({ success: false, message: 'AuthProvider not available' }),
      logout: () => {},
      hasRole: () => false,
      hasAnyRole: () => false,
      ROLES: {},
    };
  }

  return context;
};

export default AuthContext;
