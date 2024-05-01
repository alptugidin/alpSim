import { configureStore } from '@reduxjs/toolkit';
import irsdkReducer from '../features/irsdk/irsdkSlice';
import menuReducer from '../features/irsdk/menuSlice';
import boxReducer from '../features/box/boxSlice';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

export const store = configureStore({
  reducer: {
    irsdk: irsdkReducer,
    menu: menuReducer,
    box: boxReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {serializableCheck: false}
  ).concat(createStateSyncMiddleware()) as any
});

initMessageListener(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

