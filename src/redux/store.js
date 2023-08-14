import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';

import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import photoReducer from "./photoSlice"
import commentReducer from './commentSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
const redux=require('redux');



const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: userReducer, video: videoReducer, photo: photoReducer,comments:commentReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)