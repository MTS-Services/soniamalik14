import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// Fetch all events
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      // Call real API
      return apiExecutor(
        (signal) => GET(ENDPOINT.EVENTS.LIST, { signal }),
        rejectWithValue,
        signal
      );
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch events');
    }
  }
);

// Fetch event analytics
export const fetchEventAnalytics = createAsyncThunk(
  'events/fetchAnalytics',
  async (_, { rejectWithValue, signal }) => {
    try {
      // Call real API (if backend supports analytics)
      return apiExecutor(
        (signal) => GET(ENDPOINT.EVENTS.ANALYTICS, { signal }),
        rejectWithValue,
        signal
      );
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch event analytics');
    }
  }
);

// TODO: Add more event-related API calls when backend is ready
// Example endpoints to add:
// - fetchEventById(id)
// - createEvent(eventData)
// - updateEvent(id, eventData)
// - deleteEvent(id)
// - registerForEvent(eventId)
