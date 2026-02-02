import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import eventsReducer from '../features/events/eventsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer, // <- key must match useSelector
    events: eventsReducer, // <- events reducer
  },
});

export default store;
