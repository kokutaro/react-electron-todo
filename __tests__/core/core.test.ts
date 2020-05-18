import fs from 'fs-extra';
import moment from 'moment';
import path from 'path';
import { mocked } from 'ts-jest/utils';

import target, { __private__ } from '../../src/core/core';
import { Task } from '../../src/states/Task';

jest.mock('fs-extra');

jest.mock('os', () => ({
  homedir: (): string => '/home',
  platform: jest.fn(),
}));

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

describe('__private__', () => {
  test('reviver', () => {
    const key1 = 'deadline';
    const value = '2020-05-21T01:23:45.678Z';
    const result1 = __private__.reviver(key1, value);
    expect(result1).toEqual(moment.utc('2020-05-21T01:23:45.678Z').toDate());
    const key2 = 'other';
    const result2 = __private__.reviver(key2, value);
    expect(result2).toEqual(value);
  });
});

describe('loadTaskList', () => {
  const dataFilePath = path.join('/home', 'todo.json');

  test('success - exists data file', async () => {
    mocked(fs.pathExists).mockResolvedValue(true as never);
    mocked(fs.readJSON).mockResolvedValue({ data: testTaskList } as never);

    const taskList = await target.loadTaskList();

    expect(fs.ensureFileSync).not.toBeCalled();
    expect(fs.writeJSON).not.toBeCalled();

    expect(taskList).toEqual(testTaskList);
  });

  test('success - not exist data file', async () => {
    mocked(fs.pathExists).mockResolvedValue(false as never);
    mocked(fs.readJSON).mockResolvedValue({ data: [] } as never);

    const taskList = await target.loadTaskList();

    expect(fs.ensureFileSync).toBeCalledWith(dataFilePath);
    expect(fs.writeJSON).toBeCalledWith(dataFilePath, { data: [] });

    expect(taskList).toEqual([]);
  });
});
