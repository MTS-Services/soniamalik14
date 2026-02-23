import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// Fetch all events
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      // Call real API (pass signal as third arg to avoid it being serialized into query params)
      const response = await GET(ENDPOINT.EVENTS.LIST, null, signal);
      return response.data ?? response;
    } catch (error) {
      if (error?.response?.status === 404) return [];
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch events');
    }
  }
);

// Fetch event analytics
export const fetchEventAnalytics = createAsyncThunk(
  'events/fetchAnalytics',
  async (_, { rejectWithValue, signal }) => {
    try {
      // Call real API (pass signal correctly). If backend doesn't support analytics, return empty array.
      const response = await GET(ENDPOINT.EVENTS.ANALYTICS, null, signal);
      return response.data ?? response;
    } catch (error) {
      if (error?.response?.status === 404) return [];
      return rejectWithValue(
        error.response?.data || error.message || 'Failed to fetch event analytics'
      );
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
