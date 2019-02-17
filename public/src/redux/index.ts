import * as redux from 'redux';
import { DetailState, detailsReducer } from './details';

export interface RootState {
  details: DetailState;
}

export const rootReducer = redux.combineReducers({
  details: detailsReducer,
});
