import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './index';
import { convertToPlainAction } from '../utils/redux-with-class/convert-to-plain-action';

let store = createStore(rootReducer, applyMiddleware(convertToPlainAction));

export { store };
