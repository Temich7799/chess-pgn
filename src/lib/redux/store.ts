import { configureStore } from '@reduxjs/toolkit';
import { Controller } from './api/userApi';

export const store = configureStore({
  reducer: {
    [Controller.reducerPath]: Controller.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Controller.middleware),
});
