import { configureStore } from '@reduxjs/toolkit';
import irsdkReducer from '../features/irsdk/irsdkSlice';
import menuReducer from '../features/irsdk/menuSlice';
export const store = configureStore({
  reducer: {
    irsdk: irsdkReducer,
    menu: menuReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

