import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { apiExecutor } from '../../services/apiExecutor';
import eventAnalyticsData from '../../data/eventAnalyticsData.json';

// Fetch all events - using local data
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate async call with local data
      await new Promise(resolve => setTimeout(resolve, 300));
      return eventAnalyticsData || [];
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch events');
    }
  }
);

// Fetch event analytics - using local data
export const fetchEventAnalytics = createAsyncThunk(
  'events/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate async call with local data
      await new Promise(resolve => setTimeout(resolve, 300));
      return eventAnalyticsData || [];
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch event analytics');
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

export const fetchProviderEvents = createAsyncThunk(
  'events/fetchProviderEvents',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET('/api/services/provider/my', {}, signal),
        rejectWithValue,
        signal
      );
      // Ensure we extract data properly. Often it's response.data or response.data.data
      return response?.data?.data || response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch provider events');
    }
  }
);
