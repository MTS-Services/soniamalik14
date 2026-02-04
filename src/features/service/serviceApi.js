import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// For now, import from local JSON file
// When backend is ready, these will use real API endpoints
import serviceData from '../../data/serviceData.json';

// Fetch all services
export const fetchServices = createAsyncThunk(
  'service/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => GET(ENDPOINT.SERVICES.LIST, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return serviceData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

// Fetch service analytics (using same data for now)
export const fetchServiceAnalytics = createAsyncThunk(
  'service/fetchAnalytics',
  async (_, { rejectWithValue, signal }) => {
    try {
      // TODO: Replace with real API call when backend is ready
      // return apiExecutor((signal) => GET(ENDPOINT.SERVICES.ANALYTICS, { signal }), rejectWithValue, signal);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return serviceData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch service analytics');
    }
  }
);

// TODO: Add more service-related API calls when backend is ready
// Example endpoints to add:
// - fetchServiceById(id)
// - createService(serviceData)
// - updateService(id, serviceData)
// - deleteService(id)
