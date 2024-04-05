import { createSlice } from '@reduxjs/toolkit';
import { PositionsMap } from '../../ts/PositionsMapType';
import { store } from '../store';
import parsePGN from '../../utils/parsePGN';
import getInitialMap from '../../utils/getInitialMap';
import { Move } from '../../ts/MoveType';
// import getMapsFromSteps from '../../utils/getMapsFromSteps';
import getStepsFromMoves from '../../utils/getStepsFromMoves';

type PositionsMapState = {
  selectedMapIndex: number;
  selectedMap: PositionsMap;
  maps: Array<PositionsMap>;
  moves: Array<Move>
}

const getInitialState = (): PositionsMapState => {

  const maps = [getInitialMap()]

  return {
    selectedMapIndex: 0,
    maps,
    selectedMap: maps[0],
    moves: [],
  }
};

const positionsMapSlice = createSlice({
  name: 'positionsMap',
  initialState: getInitialState(),
  reducers: {
    addPGN: (state, action) => {
      const { pgn } = action.payload;
      if (state.maps.length > 1) {
        state = getInitialState();
      }
      state.moves = parsePGN(pgn);
      const steps = getStepsFromMoves(state.moves);
      // state.maps = [state.selectedMap, ...getMapsFromSteps(state.selectedMap, steps)];
      state.maps = [state.selectedMap];
      console.log(state.maps);
    },
    selectMap: (state, action) => {
      const { index } = action.payload;
      state.selectedMapIndex = index;
      state.selectedMap = state.maps[index];
    },
    goToStart: (state) => {
      state.selectedMapIndex = 0;
      state.selectedMap = state.maps[state.selectedMapIndex];
    },
    goToEnd: (state) => {
      state.selectedMapIndex = state.maps.length - 1 || 0;
      state.selectedMap = state.maps[state.selectedMapIndex];
    },
    switchNextMap: (state) => {
      if (state.maps[state.selectedMapIndex + 1]) {
        state.selectedMapIndex += 1;
        state.selectedMap = state.maps[state.selectedMapIndex];
      }
    },
    switchPrevMap: (state) => {
      if (state.maps[state.selectedMapIndex - 1]) {
        state.selectedMapIndex -= 1;
        state.selectedMap = state.maps[state.selectedMapIndex];
      }
    }
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectSelectedIndex = (state: RootState) => state.positionsMap.selectedMapIndex;
export const selectSelectedMap = (state: RootState) => state.positionsMap.selectedMap;
export const selectMaps = (state: RootState) => state.positionsMap.maps;
export const selectMoves = (state: RootState) => state.positionsMap.moves;

export const { addPGN, selectMap, goToStart, goToEnd, switchNextMap, switchPrevMap } = positionsMapSlice.actions;
export default positionsMapSlice.reducer;
