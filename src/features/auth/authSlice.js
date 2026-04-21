import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET, POST } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { getToken, getUser, removeToken, removeUser, setToken, setUser } from '../../utils/storage';

export const ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
  PROVIDER: 'provider',
  COACH: 'coach',
});

const normalizeUser = (user) => {
  if (!user || typeof user !== 'object') {
    return null;
  }

  const normalizedUser = { ...user };

  if (normalizedUser.role) {
    normalizedUser.role = String(normalizedUser.role).toLowerCase();
  }

  return normalizedUser;
};

const extractToken = (payload) => {
  return payload?.token || payload?.accessToken || payload?.data?.token || payload?.data?.accessToken || null;
};

const extractUser = (payload) => {
  const directUser = payload?.user || payload?.profile || payload?.data?.user || payload?.data?.profile || null;

  if (directUser) {
    return normalizeUser(directUser);
  }

  const fallbackCandidate = payload?.data ?? payload;

  if (!fallbackCandidate || typeof fallbackCandidate !== 'object') {
    return null;
  }

  const userLikeKeys = ['id', '_id', 'email', 'role', 'name', 'firstName', 'lastName'];
  const looksLikeUser = userLikeKeys.some((key) => fallbackCandidate[key] !== undefined);

  return looksLikeUser ? normalizeUser(fallbackCandidate) : null;
};

const extractAuthPayload = (payload) => {
  return {
    token: extractToken(payload),
    user: extractUser(payload),
  };
};

const getErrorPayload = (error, fallbackMessage) => {
  return {
    message: error?.response?.data?.message || error?.response?.data?.error || error?.message || fallbackMessage,
    status: error?.response?.status || 0,
  };
};

const persistAuth = ({ token, user }) => {
  if (token) {
    setToken(token);
  }

  if (user) {
    setUser(user);
  }
};

const clearAuth = () => {
  removeToken();
  removeUser();
};

const storedUser = normalizeUser(getUser());
const storedToken = getToken();

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: Boolean(storedUser || storedToken),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, signal }) => {
    try {
      const loginResponse = await POST(ENDPOINT.AUTH.LOGIN, { email, password }, signal);
      const loginPayload = extractAuthPayload(loginResponse?.data ?? loginResponse);

      if (loginPayload.token) {
        setToken(loginPayload.token);
      }

      let mePayload = {};

      try {
        const meResponse = await GET(ENDPOINT.AUTH.ME, {}, signal);
        mePayload = extractAuthPayload(meResponse?.data ?? meResponse);
      } catch (meError) {
        mePayload = {};
      }

      const user = mePayload.user || loginPayload.user;
      const token = loginPayload.token || mePayload.token || null;

      if (!user && !token) {
        return rejectWithValue({ message: 'Invalid login response from server', status: 0 });
      }

      persistAuth({ token, user });

      return {
        user,
        token,
      };
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Login failed'));
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registrationPayload, { rejectWithValue, signal }) => {
    try {
      const response = await POST(ENDPOINT.AUTH.REGISTER, registrationPayload, signal);
      const payload = response?.data ?? response;
      return payload;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Registration failed'));
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await GET(ENDPOINT.AUTH.ME, {}, signal);
      const payload = extractAuthPayload(response?.data ?? response);

      if (payload.user) {
        setUser(payload.user);
      }

      if (payload.token) {
        setToken(payload.token);
      }

      if (!payload.user && !payload.token) {
        return rejectWithValue({ message: 'Failed to resolve authenticated user', status: 0 });
      }

      return payload;
    } catch (error) {
      const errorPayload = getErrorPayload(error, 'Failed to load profile');

      if (errorPayload.status === 401) {
        clearAuth();
      }

      return rejectWithValue(errorPayload);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { signal }) => {
    try {
      await POST(ENDPOINT.AUTH.LOGOUT, {}, signal);
    } catch (error) {
      // Logout should still clear local state even if the server call fails.
    } finally {
      clearAuth();
    }

    return true;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth: (state, action) => {
      const user = normalizeUser(action.payload?.user);
      const token = action.payload?.token ?? state.token;

      state.user = user;
      state.token = token;
      state.isAuthenticated = Boolean(user || token);
      state.error = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = normalizeUser(action.payload?.user) || state.user;
        state.token = action.payload?.token ?? state.token;
        state.isAuthenticated = Boolean(state.user || state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || 'Registration failed';
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = normalizeUser(action.payload?.user) || state.user;
        state.token = action.payload?.token ?? state.token;
        state.isAuthenticated = Boolean(state.user || state.token);
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || 'Failed to load profile';

        if (action.payload?.status === 401) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || action.error?.message || 'Logout failed';
      });
  },
});

export const { hydrateAuth, clearAuthState } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;