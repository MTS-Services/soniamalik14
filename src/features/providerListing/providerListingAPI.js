import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET } from '../../services/httpMethods';
import { apiExecutor } from '../../services/apiExecutor';

export const fetchProviderListings = createAsyncThunk(
  'providerListing/fetchProviderListings',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET('/api/services/provider/my', {}, signal),
        rejectWithValue,
        signal
      );
      return response?.data?.data || response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch provider listings');
    }
  }
);
