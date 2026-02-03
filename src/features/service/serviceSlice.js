import { createSlice } from '@reduxjs/toolkit';
import { fetchServices, fetchServiceAnalytics } from './serviceApi';

const initialState = {
  services: {
    list: [],
    success: null,
    error: null,
    loading: false,
  },
  analytics: {
    list: [],
    success: null,
    error: null,
    loading: false,
  },
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    resetServiceError: (state) => {
      state.services.error = null;
      state.analytics.error = null;
    },
    resetService: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Services
    builder
      .addCase(fetchServices.pending, (state) => {
        state.services.loading = true;
        state.services.error = null;
        state.services.success = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services.loading = false;
        state.services.success = true;
        state.services.error = null;
        state.services.list = action.payload || [];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.services.loading = false;
        state.services.success = false;
        state.services.error = action.payload || 'Failed to fetch services';
      });

    // Fetch Service Analytics
    builder
      .addCase(fetchServiceAnalytics.pending, (state) => {
        state.analytics.loading = true;
        state.analytics.error = null;
        state.analytics.success = null;
      })
      .addCase(fetchServiceAnalytics.fulfilled, (state, action) => {
        state.analytics.loading = false;
        state.analytics.success = true;
        state.analytics.error = null;
        state.analytics.list = action.payload || [];
      })
      .addCase(fetchServiceAnalytics.rejected, (state, action) => {
        state.analytics.loading = false;
        state.analytics.success = false;
        state.analytics.error = action.payload || 'Failed to fetch service analytics';
      });
  },
});

export const { resetServiceError, resetService } = serviceSlice.actions;

// Selectors
export const selectAllServices = (state) => state.service.services.list;
export const selectServicesLoading = (state) => state.service.services.loading;
export const selectServicesError = (state) => state.service.services.error;

export const selectServiceAnalytics = (state) => state.service.analytics.list;
export const selectAnalyticsLoading = (state) => state.service.analytics.loading;
export const selectAnalyticsError = (state) => state.service.analytics.error;

export default serviceSlice.reducer;
