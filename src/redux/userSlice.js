import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logoutFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateUserStart:(state)=>{
      state.loading=true;
    },
    updateUserSuccess:(state,action)=>{
      if (state.currentUser) {
        state.currentUser = action.payload;
        state.loading=false;
      }
    },
    updateUserFailure:(state)=>{
      state.loading=false;
      state.error=true;
    },
    deleteUserStart:(state)=>{
      state.loading=true;
    },
    deleteUserSuccess:(state)=>{
      // if (state.currentUser) {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
      // }
    },
    deleteUserFailure:(state)=>{
      state.loading=false;
      state.error=true;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
    savingVideo: (state, action) => {
      if (state.currentUser.videosaved.includes(action.payload)) {
        state.currentUser.videosaved.splice(
          state.currentUser.videosaved.findIndex(
            (videoId) => videoId=== action.payload
          ),
          1
        );
      } else {
        state.currentUser.videosaved.push(action.payload);
      }
    },
    savingPhoto: (state, action) => {
      if (state.currentUser.photosaved.includes(action.payload)) {
        state.currentUser.photosaved.splice(
          state.currentUser.photosaved.findIndex(
            (photoId) => photoId=== action.payload
          ),
          1
        );
      } else {
        state.currentUser.photosaved.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription, logoutFailure,savingVideo,savingPhoto,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess } =
  userSlice.actions;

export default userSlice.reducer;