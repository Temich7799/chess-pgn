import { configureStore } from '@reduxjs/toolkit';
import { Controller } from './api/Controller';

export const store = configureStore({
  reducer: {
    [Controller.reducerPath]: Controller.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Controller.middleware),
});
