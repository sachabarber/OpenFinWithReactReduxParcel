import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root';
import { convertToPlainAction } from '../utils/redux-with-class/convert-to-plain-action';
import thunk  from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(convertToPlainAction, thunk));

export { store };
