import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET, POST, PUT, DELETE } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// For now, import from local JSON file
// When backend is ready, these will use real API endpoints
import newsData from '../../data/newsData.json';

// Fetch all news
export const fetchNews = createAsyncThunk(
  'news/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => GET(ENDPOINT.NEWS.LIST, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return newsData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch news');
    }
  }
);

// Create new news
export const createNews = createAsyncThunk(
  'news/create',
  async (newsItem, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => POST(ENDPOINT.NEWS.CREATE, newsItem, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate ID and return the new item
      const newItem = {
        ...newsItem,
        id: Date.now(),
        date: new Date().toDateString(),
      };
      return newItem;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create news');
    }
  }
);

// Update news
export const updateNews = createAsyncThunk(
  'news/update',
  async ({ id, data }, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => PUT(ENDPOINT.NEWS.UPDATE(id), data, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { id, data };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update news');
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk(
  'news/delete',
  async (id, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => DELETE(ENDPOINT.NEWS.DELETE(id), { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete news');
    }
  }
);
