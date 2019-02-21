import * as redux from 'redux';
import { TilesInfoState, tilesReducer } from './tiles';
import { BlotterInfoState, blotterReducer } from './blotter';


export interface RootState {
    tiles: TilesInfoState;
    blotter: BlotterInfoState;
}

export const rootReducer = redux.combineReducers({
    tiles: tilesReducer,
    blotter: blotterReducer,
});
