import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPhoto: null,
  loading: false,
  error: false,
};


export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentPhoto = action.payload;

    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentPhoto.likes.includes(action.payload)) {
        state.currentPhoto.likes.push(action.payload);
        state.currentPhoto.dislikes.splice(
          state.currentPhoto.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentPhoto.dislikes.includes(action.payload)) {
        state.currentPhoto.dislikes.push(action.payload);
        state.currentPhoto.likes.splice(
          state.currentPhoto.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    undislike: (state, action) => {
      if (state.currentPhoto.dislikes.includes(action.payload)) {
        state.currentPhoto.dislikes.splice(
          state.currentPhoto.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    unlike: (state, action) => {
      if (state.currentPhoto.likes.includes(action.payload)) {
        state.currentPhoto.likes.splice(
          state.currentPhoto.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure,like,dislike,unlike,undislike } =
  photoSlice.actions;

export default photoSlice.reducer;