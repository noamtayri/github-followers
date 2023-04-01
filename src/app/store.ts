import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import followersReducer from '../features/followers/followersSlice';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    followers: followersReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
