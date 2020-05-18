import '../../src/core/CoreInterface';
import 'ts-jest';

import { getTaskList, showTaskListAction } from '../../src/actions/TaskActions';
import { Task } from '../../src/states/Task';

const dispatch = jest.fn();
const loadTaskList = jest.fn();

(global as any).window.core = {
  loadTaskList,
};

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

describe('getTaskList', () => {
  test('success', async () => {
    loadTaskList.mockResolvedValueOnce(testTaskList);

    const action = showTaskListAction.done({
      result: testTaskList,
      params: null,
    });
    await getTaskList(dispatch);
    expect(dispatch).toBeCalledWith(action);
  });

  test('failed', async () => {
    loadTaskList.mockRejectedValueOnce(new Error());

    const action = showTaskListAction.failed({
      error: 'Error',
      params: null,
    });

    await getTaskList(dispatch);

    expect(dispatch).toBeCalledWith(action);
  });
});
