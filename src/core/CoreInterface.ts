import { Task } from '../states/Task';

export default interface Core {
  loadTaskList: () => Promise<Task[]>;
  saveTask: (task: Task) => Promise<Task[]>;
  deleteTask: (taskId: string) => Promise<Task[]>;
}

declare global {
  interface Window {
    core: Core;
  }
}
