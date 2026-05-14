import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET, POST, PUT, DELETE } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';
import { toast } from 'react-toastify';

/**
 * Professional Service API Layer
 * Handles all service-related API calls with proper error handling and toast notifications
 */

// Fetch all approved services (public)
export const fetchApprovedServices = createAsyncThunk(
  'service/fetchApproved',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET(ENDPOINT.SERVICES.APPROVED, {}, signal),
        rejectWithValue,
        signal
      );
      return response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

// Fetch provider's own services (all statuses)
export const fetchProviderServices = createAsyncThunk(
  'service/fetchProviderServices',
  async (providerId, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET(ENDPOINT.SERVICES.PROVIDER_SERVICES(providerId), {}, signal),
        rejectWithValue,
        signal
      );
      return response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch provider services');
    }
  }
);


// Fetch pending services (admin only)
export const fetchPendingServices = createAsyncThunk(
  'service/fetchPending',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => GET(ENDPOINT.SERVICES.PENDING, {}, signal),
        rejectWithValue,
        signal
      );
      return response?.data || response || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch pending services');
    }
  }
);

// Create new service (provider)
export const createService = createAsyncThunk(
  'service/create',
  async ({ providerId, serviceData }, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => POST(ENDPOINT.SERVICES.CREATE(providerId), serviceData, signal),
        rejectWithValue,
        signal
      );
      const result = response?.data || response;
      toast.success('Service submitted for approval');
      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to create service');
      return rejectWithValue(error.message || 'Failed to create service');
    }
  }
);

// Update service (provider)
export const updateService = createAsyncThunk(
  'service/update',
  async ({ id, serviceData }, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => PUT(ENDPOINT.SERVICES.UPDATE(id), serviceData, signal),
        rejectWithValue,
        signal
      );
      const result = response?.data || response;
      toast.success('Service updated successfully');
      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to update service');
      return rejectWithValue(error.message || 'Failed to update service');
    }
  }
);

// Delete service (provider)
export const deleteService = createAsyncThunk(
  'service/delete',
  async (id, { rejectWithValue, signal }) => {
    try {
      await apiExecutor(
        (signal) => DELETE(ENDPOINT.SERVICES.DELETE(id), signal),
        rejectWithValue,
        signal
      );
      toast.success('Service deleted successfully');
      return id;
    } catch (error) {
      toast.error(error.message || 'Failed to delete service');
      return rejectWithValue(error.message || 'Failed to delete service');
    }
  }
);

// Approve service (admin)
export const approveService = createAsyncThunk(
  'service/approve',
  async (id, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => POST(ENDPOINT.SERVICES.APPROVE(id), {}, signal),
        rejectWithValue,
        signal
      );
      const result = response?.data || response;
      toast.success('Service approved successfully');
      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to approve service');
      return rejectWithValue(error.message || 'Failed to approve service');
    }
  }
);

// Reject service (admin)
export const rejectService = createAsyncThunk(
  'service/reject',
  async ({ id, reason }, { rejectWithValue, signal }) => {
    try {
      const response = await apiExecutor(
        (signal) => POST(ENDPOINT.SERVICES.REJECT(id), { reason }, signal),
        rejectWithValue,
        signal
      );
      const result = response?.data || response;
      toast.success('Service rejected');
      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to reject service');
      return rejectWithValue(error.message || 'Failed to reject service');
    }
  }
);
