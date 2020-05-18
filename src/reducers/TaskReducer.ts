import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  addTaskAction,
  deleteTaskAction,
  showTaskListAction,
  toggleCompleteAction,
} from '../actions/TaskActions';
import { TaskList } from '../states/Task';

const initialState: TaskList = {
  tasks: [],
};

const taskReducer = reducerWithInitialState(initialState)
  .case(showTaskListAction, (state, payload) => ({
    ...state,
    tasks: payload,
  }))
  .case(addTaskAction, (state, payload) => {
    const taskList = [...state.tasks, payload];
    return {
      ...state,
      tasks: taskList,
    };
  })
  .case(deleteTaskAction, (state, payload) => {
    const taskList = state.tasks.filter((task) => task.id !== payload);
    return {
      ...state,
      tasks: taskList,
    };
  })
  .case(toggleCompleteAction, (state, payload) => {
    const taskList = [...state.tasks];
    const task = taskList.find((task) => task.id === payload);
    if (!task) {
      return state;
    }
    task.complete = !task.complete;
    return {
      ...state,
      tasks: taskList,
    };
  })
  .build();

export default taskReducer;
