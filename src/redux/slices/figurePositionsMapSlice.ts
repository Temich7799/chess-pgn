import { createSlice } from '@reduxjs/toolkit';
import getInitialMap from '../../utils/getInitialMap';
import { PositionsMap } from '../../ts/PositionsMapType';
import { store } from '../store';

type figurePositionsMapState = {
  initialMap: PositionsMap;
}

const initialState: figurePositionsMapState = {
  initialMap: getInitialMap(),
};

const figurePositionsMapSlice = createSlice({
  name: 'figurePositionsMap',
  initialState,
  reducers: {

  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectFigurePositionsMap = (state: RootState) => state.figurePositionsMap;

export const { } = figurePositionsMapSlice.actions;
export default figurePositionsMapSlice.reducer;
