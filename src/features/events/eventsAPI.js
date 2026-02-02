import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// For now, import from local JSON files
// When backend is ready, these will use real API endpoints
import eventsData from '../../data/eventsData.json';
import eventAnalyticsData from '../../data/eventAnalyticsData.json';

// Fetch all events
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => GET(ENDPOINT.EVENTS.LIST, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return eventsData;
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
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => GET(ENDPOINT.EVENTS.ANALYTICS, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return eventAnalyticsData;
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
