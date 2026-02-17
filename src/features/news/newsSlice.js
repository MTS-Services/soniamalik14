import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, createNews, updateNews, deleteNews } from './newsAPI';

const initialState = {
  list: [],
  success: null,
  error: null,
  loading: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetNewsError: (state) => {
      state.error = null;
    },
    resetNews: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch News
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.list = action.payload || [];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to fetch news';
      });

    // Create News
    builder
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Add new item to the beginning of the list
        state.list.unshift(action.payload);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to create news';
      });

    // Update News
    builder
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Update the item in the list
        const { id, data } = action.payload;
        const index = state.list.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...data };
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to update news';
      });

    // Delete News
    builder
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Remove the item from the list
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to delete news';
      });
  },
});

export const { resetNewsError, resetNews } = newsSlice.actions;

// Selectors
export const selectAllNews = (state) => state.news.list;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsSuccess = (state) => state.news.success;

export default newsSlice.reducer;
