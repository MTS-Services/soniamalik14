import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, fetchEventAnalytics } from './eventsAPI';

const initialState = {
  events: {
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

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetEventsError: (state) => {
      state.events.error = null;
      state.analytics.error = null;
    },
    resetEvents: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Events
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
        state.events.success = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events.loading = false;
        state.events.success = true;
        state.events.error = null;
        state.events.list = action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.events.success = false;
        state.events.error = action.payload || 'Failed to fetch events';
      });

    // Fetch Event Analytics
    builder
      .addCase(fetchEventAnalytics.pending, (state) => {
        state.analytics.loading = true;
        state.analytics.error = null;
        state.analytics.success = null;
      })
      .addCase(fetchEventAnalytics.fulfilled, (state, action) => {
        state.analytics.loading = false;
        state.analytics.success = true;
        state.analytics.error = null;
        state.analytics.list = action.payload || [];
      })
      .addCase(fetchEventAnalytics.rejected, (state, action) => {
        state.analytics.loading = false;
        state.analytics.success = false;
        state.analytics.error = action.payload || 'Failed to fetch event analytics';
      });
  },
});

export const { resetEventsError, resetEvents } = eventsSlice.actions;

// Selectors
export const selectAllEvents = (state) => state.events.events.list;
export const selectEventsLoading = (state) => state.events.events.loading;
export const selectEventsError = (state) => state.events.events.error;

export const selectEventAnalytics = (state) => state.events.analytics.list;
export const selectAnalyticsLoading = (state) => state.events.analytics.loading;
export const selectAnalyticsError = (state) => state.events.analytics.error;

export default eventsSlice.reducer;
