import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import shortid from 'shortid';

import { Task } from '../states/Task';
import Core from './CoreInterface';

const dataFilePath = path.join(os.homedir(), 'todo.json');

export const setTimeoutPromise = (count: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, count);
  });
};

export const __private__ = {
  reviver: (key: string, value: unknown): unknown => {
    if (key === 'deadline') {
      return new Date(value as string);
    } else {
      return value;
    }
  },

  replacer: (key: string, value: unknown): unknown => {
    if (key !== 'deadline') {
      return value;
    }
    return new Date(value as string).toISOString();
  },
};

const loadTaskList = async (): Promise<Task[]> => {
  const exist = await fs.pathExists(dataFilePath);
  if (!exist) {
    fs.ensureFileSync(dataFilePath);
    await fs.writeJSON(dataFilePath, { data: [] });
  }

  const jsonData = (await fs.readJSON(dataFilePath, {
    reviver: __private__.reviver,
  })) as { data: Task[] };
  return jsonData.data;
};

const saveTaskList = async (taskList: Task[]): Promise<void> => {
  await fs.writeJSON(
    dataFilePath,
    { data: taskList },
    {
      replacer: __private__.replacer,
      spaces: 2,
    },
  );
};

const saveTask = async (task: Task): Promise<Task[]> => {
  const taskList = await loadTaskList();
  const existTask = taskList.find((pTask) => pTask.id === task.id);
  if (!task.id || !existTask) {
    task.id = shortid();
    taskList.push(task);
  } else {
    existTask.complete = task.complete;
    existTask.deadline = task.deadline;
    existTask.taskName = task.taskName;
  }
  await saveTaskList(taskList);
  return taskList;
};

const deleteTask = async (id: string): Promise<Task[]> => {
  const taskList = await loadTaskList();
  const deletedTaskList = taskList.filter((task) => task.id !== id);
  await saveTaskList(deletedTaskList);
  return deletedTaskList;
};

const core: Core = {
  deleteTask,
  loadTaskList,
  saveTask,
};

export default core;
