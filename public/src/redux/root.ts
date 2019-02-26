import * as redux from 'redux';
import { TilesInfoState, tilesReducer } from './tiles';
import { BlotterInfoState, blotterReducer } from './blotter';
import { ChartInfoState, chartReducer } from './chart';

export interface RootState {
    tiles: TilesInfoState;
    blotter: BlotterInfoState;
    chart: ChartInfoState;
}

export const rootReducer = redux.combineReducers({
    tiles: tilesReducer,
    blotter: blotterReducer,
    chart: chartReducer
});
