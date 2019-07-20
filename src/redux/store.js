import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);
