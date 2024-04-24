import {
  configureStore
} from '@reduxjs/toolkit';
import {
  userApi
} from './api/userApi';
import {
  friendshipApi
} from './api/friendshipApi';
import {
  cityApi
} from './api/cityApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [friendshipApi.reducerPath]: friendshipApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      friendshipApi.middleware,
      cityApi.middleware
    ),
});