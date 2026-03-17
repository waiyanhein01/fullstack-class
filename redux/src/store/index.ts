import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"
import postsReducer from "./postsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer
  },
});

// For TypeScript inference
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
