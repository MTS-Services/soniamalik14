import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import eventsReducer from '../features/events/eventsSlice';
import recruitmentReducer from '../features/recruitment/recruitmentSlice';

const store = configureStore({
  reducer: {
    products: productsReducer, // <- key must match useSelector
    events: eventsReducer,
    recruitment: recruitmentReducer,
  },
});

export default store;
