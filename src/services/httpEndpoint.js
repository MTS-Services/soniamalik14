// Route Paths
export const ENDPOINT = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PRODUCTS: '/api/products?limit=5',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
  },
  NEWS: {
    LIST: '/api/news',
    CREATE: '/api/news',
    UPDATE: (id) => `/api/news/${id}`,
    DELETE: (id) => `/api/news/${id}`,
    DETAIL: (id) => `/api/news/${id}`,
  },
};
