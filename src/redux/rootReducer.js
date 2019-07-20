import { combineReducers } from 'redux';
import mapReducer from './reducers/mapReducer'

const allReducers = {
  mapReducer
};

export const rootReducer = combineReducers(allReducers);
