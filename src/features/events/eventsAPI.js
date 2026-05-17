import { createAsyncThunk } from '@reduxjs/toolkit';
import { DELETE, GET, POST, PUT } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';
import eventAnalyticsData from '../../data/eventAnalyticsData.json';
import { toast } from 'react-toastify';

const getApiErrorMessage = (error, fallbackMessage) => {
  const payload = error?.response?.data || error;
  const fallback = fallbackMessage || error?.message || 'Request failed';

  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const details = payload.errors
      .map((entry) => {
        if (typeof entry === 'string') return entry;
        const field = entry?.path || entry?.field || entry?.param || entry?.name;
        const message = entry?.msg || entry?.message || entry?.error;
        if (field && message) return `${field}: ${message}`;
        return message || field || null;
      })
      .filter(Boolean)
      .join(' | ');

    if (details) {
      return `${payload?.message || 'Validation error'}: ${details}`;
    }
  }

  return payload?.message || fallback;
};

// Fetch approved public events
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET(ENDPOINT.EVENTS.APPROVED, {}, signal, { skipAuth: true, withCredentials: false }),
        rejectWithValue,
        signal
      );
      return response?.data?.data || response?.data || response || [];
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
        (signal) => GET('/api/events/my/list', {}, signal),
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

export const fetchOrganizerEvents = createAsyncThunk(
  'events/fetchOrganizerEvents',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET('/api/events/my/list', {}, signal),
        rejectWithValue,
        signal
      );
      return response?.data?.data || response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch organizer events');
    }
  }
);

export const fetchOrganizerEventById = createAsyncThunk(
  'events/fetchOrganizerEventById',
  async (eventId, { rejectWithValue, signal }) => {
    try {
      if (!eventId) {
        return rejectWithValue('Event id is required');
      }

      const response = await GET(`/api/events/${eventId}`, {}, signal);
      const result = response?.data || response;
      return result?.data || result;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error, 'Failed to fetch event details'));
    }
  }
);

export const createOrganizerEvent = createAsyncThunk(
  'events/createOrganizerEvent',
  async (eventData, { rejectWithValue, signal }) => {
    try {
      const response = await POST('/api/events', eventData, signal);
      const result = response?.data || response;
      toast.success(result?.message || 'Event created successfully');
      return result?.data || result;
    } catch (error) {
      const message = getApiErrorMessage(error, 'Failed to create event');
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateOrganizerEvent = createAsyncThunk(
  'events/updateOrganizerEvent',
  async ({ id, eventData }, { rejectWithValue, signal }) => {
    try {
      if (!id) {
        return rejectWithValue('Event id is required');
      }

      const response = await PUT(`/api/events/${id}`, eventData, signal);
      const result = response?.data || response;
      toast.success(result?.message || 'Event updated successfully');
      return result?.data || result;
    } catch (error) {
      const message = getApiErrorMessage(error, 'Failed to update event');
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteOrganizerEvent = createAsyncThunk(
  'events/deleteOrganizerEvent',
  async (eventId, { rejectWithValue, signal }) => {
    try {
      if (!eventId) {
        return rejectWithValue('Event id is required');
      }

      const response = await DELETE(`/api/events/${eventId}`, signal);
      const result = response?.data || response;
      toast.success(result?.message || 'Event deleted successfully');
      return eventId;
    } catch (error) {
      const message = getApiErrorMessage(error, 'Failed to delete event');
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
