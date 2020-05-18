import moment from 'moment';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from 'typescript-fsa';

import { Task } from '../states/Task';
const actionCreator = actionCreatorFactory('TASK_ACTIONS');

export const showTaskListAction = actionCreator<Task[]>('SHOW_TASK_LIST');

export const addTaskAction = actionCreator<Task>('ADD');

export const toggleCompleteAction = actionCreator<string>('TOGGLE_COMPLETE');

export const deleteTaskAction = actionCreator<string>('DELETE');

const dummyTask: Task[] = [
  {
    complete: false,
    deadline: moment().add(1, 'd').toDate(),
    id: '0',
    taskName: 'Task 1',
  },
  {
    complete: true,
    deadline: moment().add(1, 'd').toDate(),
    id: '1',
    taskName: 'Task 2',
  },
  {
    complete: false,
    deadline: moment().add(-1, 'd').toDate(),
    id: '3',
    taskName: 'Task 3',
  },
  {
    complete: true,
    deadline: moment().add(-1, 'd').toDate(),
    id: '4',
    taskName: 'Task 4',
  },
];

export const getTaskList = (dispatch: Dispatch): void => {
  dispatch(showTaskListAction(dummyTask));
};
