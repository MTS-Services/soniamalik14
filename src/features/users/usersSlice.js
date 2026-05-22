import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from './usersAPI';

const getErrorPayload = (error, fallbackMessage) => {
  return {
    message: error?.response?.data?.message || error?.response?.data?.error || error?.message || fallbackMessage,
    status: error?.response?.status || 0,
  };
};

export const fetchSuspendedUsers = createAsyncThunk(
  'users/fetchSuspendedUsers',
  async ({ page = 1, limit = 100, filters = {} }, { rejectWithValue, signal }) => {
    try {
      const params = { page, limit, ...filters };
      const response = await usersAPI.getSuspendedUsers(params, signal);
      const payload = response?.data ?? response;
      return payload;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Failed to fetch suspended users'));
    }
  }
);
const initialState = {
  allUsers: [],
  loading: false,
  error: null,
  suspend: {
    loading: false,
    error: null,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({ page = 1, limit = 100, filters = {} }, { rejectWithValue, signal }) => {
    try {
      const params = { page, limit, ...filters };
      const response = await usersAPI.getAllUsers(params, signal);
      const payload = response?.data ?? response;
      return payload;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Failed to fetch users'));
    }
  }
);

export const suspendUser = createAsyncThunk(
  'users/suspendUser',
  async ({ userId, reason }, { rejectWithValue, signal }) => {
    try {
      const response = await usersAPI.suspendUser(userId, { reason }, signal);
      const payload = response?.data ?? response;
      return { userId, ...payload };
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Failed to suspend user'));
    }
  }
);

export const unsuspendUser = createAsyncThunk(
  'users/unsuspendUser',
  async ({ userId }, { rejectWithValue, signal }) => {
    try {
      const response = await usersAPI.unsuspendUser(userId, signal);
      const payload = response?.data ?? response;
      return { userId, ...payload };
    } catch (error) {
      return rejectWithValue(getErrorPayload(error, 'Failed to reinstate user'));
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetError: (state, action) => {
      const { type } = action.payload || {};
      if (type === 'users') state.error = null;
      if (type === 'suspend') state.suspend.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Suspended Users
    builder
      .addCase(fetchSuspendedUsers.pending, (state) => {
        state.suspend.loading = true;
        state.suspend.error = null;
      })
      .addCase(fetchSuspendedUsers.fulfilled, (state, action) => {
        state.suspend.loading = false;
        // store suspended users separately on state for clarity
        state.suspendedUsers = action.payload?.data || action.payload || [];
        state.pagination = action.payload?.pagination || state.pagination;
      })
      .addCase(fetchSuspendedUsers.rejected, (state, action) => {
        state.suspend.loading = false;
        state.suspend.error = action.payload?.message || action.error?.message || 'Failed to fetch suspended users';
      });

    // Fetch All Users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload?.data || action.payload || [];
        state.pagination = action.payload?.pagination || state.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || 'Failed to fetch users';
      });

    // Suspend User
    builder
      .addCase(suspendUser.pending, (state) => {
        state.suspend.loading = true;
        state.suspend.error = null;
      })
      .addCase(suspendUser.fulfilled, (state) => {
        state.suspend.loading = false;
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.suspend.loading = false;
        state.suspend.error = action.payload?.message || action.error?.message || 'Failed to suspend user';
      })
      .addCase(unsuspendUser.pending, (state) => {
        state.suspend.loading = true;
        state.suspend.error = null;
      })
      .addCase(unsuspendUser.fulfilled, (state) => {
        state.suspend.loading = false;
      })
      .addCase(unsuspendUser.rejected, (state, action) => {
        state.suspend.loading = false;
        state.suspend.error = action.payload?.message || action.error?.message || 'Failed to reinstate user';
      });
  },
});

export const { resetError } = usersSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.users.allUsers;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
export const selectSuspendLoading = (state) => state.users.suspend.loading;
export const selectPagination = (state) => state.users.pagination;
export const selectSuspendedUsers = (state) => state.users.suspendedUsers || [];
export const selectSuspendedLoading = (state) => state.users.suspend.loading;
export const selectSuspendedError = (state) => state.users.suspend.error;

// Helper selector to filter users by role
export const selectUsersByRole = (role) => (state) => {
  const ROLE_MAP = {
    USER: 'USER',
    COACH: 'COACH',
    PROVIDER: 'PROVIDER',
  };
  return state.users.allUsers.filter((user) => user.role === ROLE_MAP[role]);
};

export default usersSlice.reducer;
