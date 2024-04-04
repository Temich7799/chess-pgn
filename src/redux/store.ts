import { configureStore } from '@reduxjs/toolkit';
import figurePositionsMapReducer from './slices/figurePositionsMapSlice';

export const store = configureStore({
  reducer: {
    figurePositionsMap: figurePositionsMapReducer,
  },
});
