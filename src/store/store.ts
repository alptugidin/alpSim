import { configureStore } from '@reduxjs/toolkit';
import irsdkReducer from '../features/irsdk/irsdkSlice';
export const store = configureStore({
  reducer: irsdkReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
