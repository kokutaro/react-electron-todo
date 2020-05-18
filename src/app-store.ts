import { combineReducers, createStore } from 'redux';

import taskReducer from './reducers/TaskReducer';
import { State } from './states/State';

const combinedReducer = combineReducers<State>({
  taskList: taskReducer,
});

const appStore = createStore(combinedReducer);

export default appStore;
