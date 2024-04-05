import { configureStore } from '@reduxjs/toolkit';
import positionsMapReducer from './slices/positionsMapSlice';

export const store = configureStore({
  reducer: {
    positionsMap: positionsMapReducer,
  },
});
