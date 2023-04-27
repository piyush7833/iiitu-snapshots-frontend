import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define async thunk for fetching comments
export const fetchComment = createAsyncThunk(
  'comments',
  async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

// Define comment slice
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null
  },
  reducers: {
    addComments(state, action) {
      state.comments.push(action.payload);
    },
    deleteComment(state, action) {
      const commentId = action.payload;
      const updatedComments = state.comments.filter(comment => comment._id !== commentId._id);
      state.comments = updatedComments;
    }
  },
  extraReducers: {
    [fetchComment.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [fetchComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = null;
    },
    [fetchComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

// Export comment actions and reducer
export const { addComments, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
