import '../core/CoreInterface';

import { Dispatch } from 'redux';
import { actionCreatorFactory } from 'typescript-fsa';

import { Task } from '../states/Task';

const actionCreator = actionCreatorFactory('TASK_ACTIONS');

export const showTaskListAction = actionCreator.async<null, Task[], string>('SHOW_TASK_LIST');

export const getTaskList = async (dispatch: Dispatch): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.loadTaskList().catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: e.toString(),
        params: null,
      }),
    );
  });
  if (!taskList) {
    return;
  }
  dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const addTask = async (task: Task, dispatch: Dispatch): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.saveTask(task).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: e.toString(),
        params: null,
      }),
    );
  });
  if (!taskList) {
    return;
  }
  dispatch(
    showTaskListAction.done({
      result: taskList,
      params: null,
    }),
  );
};

export const toggleTask = async (task: Task, dispatch: Dispatch): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  task.complete = !task.complete;
  const taskList = await window.core.saveTask(task).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: e.toString(),
        params: null,
      }),
    );
  });
  if (!taskList) {
    return;
  }
  dispatch(
    showTaskListAction.done({
      result: taskList,
      params: null,
    }),
  );
};

export const deleteTask = async (taskId: string, dispatch: Dispatch): Promise<void> => {
  dispatch(showTaskListAction.started(null));
  const taskList = await window.core.deleteTask(taskId).catch((e) => {
    console.error(e);
    dispatch(
      showTaskListAction.failed({
        error: e.toString(),
        params: null,
      }),
    );
  });
  if (!taskList) {
    return;
  }
  dispatch(
    showTaskListAction.done({
      result: taskList,
      params: null,
    }),
  );
};
