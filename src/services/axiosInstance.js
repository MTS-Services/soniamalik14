import axios from 'axios';
import { API_CONFIG } from '../config/constants';
import { getToken } from '../utils/storage';

// In development we prefer relative requests so Vite dev server proxy can forward /api to backend
const baseURL = import.meta.env.DEV ? '' : API_CONFIG.BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  // allow sending cookies if backend uses cookie-based auth
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    // Temporary debug: log whether a token was found (masked)
    try {
      const masked = token ? `${String(token).slice(0, 6)}...` : null;
      // eslint-disable-next-line no-console
      console.debug('[axios] auth token (masked):', masked);
    } catch (e) {
      // noop
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Only for non-error responses

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Detailed error logging for debugging network/auth issues
    try {
      // eslint-disable-next-line no-console
      console.error('[axios][error]', {
        url: error?.config?.url,
        method: error?.config?.method,
        status: error?.response?.status,
        response: error?.response?.data,
        message: error?.message,
      });
    } catch (e) {
      // noop
    }

    // Pass through errors to be handled by callers
    return Promise.reject(error);
  }
);

export default axiosInstance;
