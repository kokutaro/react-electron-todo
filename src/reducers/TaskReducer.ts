import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { showTaskListAction } from '../actions/TaskActions';
import { TaskList } from '../states/Task';

/** Initial value of TaskList */
const initialState: TaskList = {
  tasks: [],
  failureMessage: '',
  loading: false,
};

const taskReducer = reducerWithInitialState(initialState)
  .case(showTaskListAction.started, (state) => ({
    ...state,
    loading: true,
    failureMessage: '',
  }))
  .case(showTaskListAction.done, (state, payload) => ({
    ...state,
    tasks: payload.result,
    loading: false,
    failureMessage: '',
  }))
  .case(showTaskListAction.failed, (state, payload) => ({
    ...state,
    loading: false,
    failureMessage: payload.error,
  }))

  .build();

export default taskReducer;
