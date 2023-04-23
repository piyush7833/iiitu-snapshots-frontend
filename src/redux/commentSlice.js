import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Define initial state for comments
const initialState = {
  comments: [],
  loading: false,
  error: null
};

// Define async thunk for fetching comments
export const fetchComment = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await axios.get('/comments');
    const data = await response.json();
    return data;
  }
);

// Define comment slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.push(action.payload);
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
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
export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
