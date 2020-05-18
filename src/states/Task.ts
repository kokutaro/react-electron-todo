export interface Task {
  complete: boolean;
  deadline: Date;
  id: string;
  taskName: string;
}

export interface TaskList {
  tasks: Task[];
}
