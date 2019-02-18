import * as redux from 'redux';
//import { DetailState, detailsReducer } from './details';
import { TilesInfoState, tilesReducer } from './tiles';



export interface RootState {
    //details: DetailState;
    tiles: TilesInfoState;
}

export const rootReducer = redux.combineReducers({
    //details: detailsReducer,
    tiles: tilesReducer,
});
