import 'ts-jest';

import taskReducer from '../../src/reducers/TaskReducer';
import { Task, TaskList } from '../../src/states/Task';

describe('TaskReducer', () => {
  const testTaskList: Task[] = [
    {
      complete: false,
      deadline: new Date('2020-05-24T15:00:32.000Z'),
      id: 'x001',
      taskName: 'task001',
    },
    {
      complete: false,
      deadline: new Date('2020-05-25T12:00:32.000Z'),
      id: 'x002',
      taskName: 'task002',
    },
  ];

  test('showTaskListAction: STARTED', () => {
    const beforeState: TaskList = {
      failureMessage: 'before',
      loading: false,
      tasks: [],
    };
    const afterState = taskReducer(beforeState, {
      type: 'TASK_ACTIONS/SHOW_TASK_LIST_STARTED',
    } as any);
    expect(afterState).toEqual({
      failureMessage: '',
      loading: true,
      tasks: [],
    });
  });

  test('showTaskListAction: DONE', () => {
    const beforeState: TaskList = {
      failureMessage: 'before',
      loading: true,
      tasks: [],
    };
    const afterState = taskReducer(beforeState, {
      type: 'TASK_ACTIONS/SHOW_TASK_LIST_DONE',
      payload: {
        result: testTaskList,
        params: null,
      },
    } as any);
    expect(afterState).toEqual({
      failureMessage: '',
      loading: false,
      tasks: testTaskList,
    });
  });

  test('showTaskListAction: FAILED', () => {
    const beforeState: TaskList = {
      failureMessage: 'before',
      loading: true,
      tasks: [],
    };
    const afterState = taskReducer(beforeState, {
      type: 'TASK_ACTIONS/SHOW_TASK_LIST_FAILED',
      payload: {
        error: 'error',
        params: null,
      },
    } as any);
    expect(afterState).toEqual({
      failureMessage: 'error',
      loading: false,
      tasks: [],
    });
  });
});
