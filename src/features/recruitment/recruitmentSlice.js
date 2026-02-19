import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recruitmentAPI from './recruitmentAPI';

// Thunk uses API abstraction for easier testing and reuse
export const fetchRecruitments = createAsyncThunk(
  'recruitment/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await recruitmentAPI.fetchRecruitmentsJSON();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch recruitments');
    }
  }
);

const recruitmentSlice = createSlice({
  name: 'recruitment',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruitments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruitments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecruitments.rejected, (state, action) => {
        state.loading = false;
        // prefer payload from rejectWithValue when available
        state.error = action.payload || action.error?.message || 'Failed to load recruitments';
      });
  },
});

export const selectRecruitments = (state) => state.recruitment.items || [];
export const selectRecruitmentById = (state, id) =>
  (state.recruitment.items || []).find((r) => String(r.id) === String(id));

export default recruitmentSlice.reducer;
