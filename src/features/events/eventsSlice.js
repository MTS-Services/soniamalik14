import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchEventAnalytics,
  fetchProviderEvents,
  fetchOrganizerEvents,
  createOrganizerEvent,
} from './eventsAPI';

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
  providerEvents: {
    list: [],
    success: null,
    error: null,
    loading: false,
  },
  organizerEvents: {
    list: [],
    success: null,
    error: null,
    loading: false,
  },
  createOrganizerEvent: {
    loading: false,
    success: null,
    error: null,
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetEventsError: (state) => {
      state.events.error = null;
      state.analytics.error = null;
      state.providerEvents.error = null;
      state.organizerEvents.error = null;
      state.createOrganizerEvent.error = null;
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

    // Fetch Provider Events
    builder
      .addCase(fetchProviderEvents.pending, (state) => {
        state.providerEvents.loading = true;
        state.providerEvents.error = null;
        state.providerEvents.success = null;
      })
      .addCase(fetchProviderEvents.fulfilled, (state, action) => {
        state.providerEvents.loading = false;
        state.providerEvents.success = true;
        state.providerEvents.error = null;
        state.providerEvents.list = action.payload || [];
      })
      .addCase(fetchProviderEvents.rejected, (state, action) => {
        state.providerEvents.loading = false;
        state.providerEvents.success = false;
        state.providerEvents.error = action.payload || 'Failed to fetch provider events';
      })

      // Fetch Organizer Own Events
      .addCase(fetchOrganizerEvents.pending, (state) => {
        state.organizerEvents.loading = true;
        state.organizerEvents.error = null;
        state.organizerEvents.success = null;
      })
      .addCase(fetchOrganizerEvents.fulfilled, (state, action) => {
        state.organizerEvents.loading = false;
        state.organizerEvents.success = true;
        state.organizerEvents.error = null;
        state.organizerEvents.list = action.payload || [];
      })
      .addCase(fetchOrganizerEvents.rejected, (state, action) => {
        state.organizerEvents.loading = false;
        state.organizerEvents.success = false;
        state.organizerEvents.error = action.payload || 'Failed to fetch organizer events';
      })

      // Create Organizer Event
      .addCase(createOrganizerEvent.pending, (state) => {
        state.createOrganizerEvent.loading = true;
        state.createOrganizerEvent.error = null;
        state.createOrganizerEvent.success = null;
      })
      .addCase(createOrganizerEvent.fulfilled, (state, action) => {
        state.createOrganizerEvent.loading = false;
        state.createOrganizerEvent.success = true;
        state.createOrganizerEvent.error = null;
        const created = action.payload;
        if (created && typeof created === 'object') {
          state.organizerEvents.list = [created, ...(Array.isArray(state.organizerEvents.list) ? state.organizerEvents.list : [])];
        }
      })
      .addCase(createOrganizerEvent.rejected, (state, action) => {
        state.createOrganizerEvent.loading = false;
        state.createOrganizerEvent.success = false;
        state.createOrganizerEvent.error = action.payload || 'Failed to create organizer event';
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

export const selectProviderEvents = (state) => state.events.providerEvents.list;
export const selectProviderEventsLoading = (state) => state.events.providerEvents.loading;
export const selectProviderEventsError = (state) => state.events.providerEvents.error;

export const selectOrganizerEvents = (state) => state.events.organizerEvents.list;
export const selectOrganizerEventsLoading = (state) => state.events.organizerEvents.loading;
export const selectOrganizerEventsError = (state) => state.events.organizerEvents.error;

export const selectCreateOrganizerEventLoading = (state) => state.events.createOrganizerEvent.loading;
export const selectCreateOrganizerEventError = (state) => state.events.createOrganizerEvent.error;

export default eventsSlice.reducer;
