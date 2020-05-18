import { combineReducers, createStore } from 'redux';

import userReducer from './reducers/UserReducer';
import { State } from './states/State';

const combinedReducer = combineReducers<State>({
  user: userReducer,
});

export const store = createStore(combinedReducer);

export default store;
