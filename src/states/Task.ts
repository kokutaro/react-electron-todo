export interface Task {
  complete: boolean;
  deadline: Date;
  id: string;
  taskName: string;
}

export interface TaskList {
  /** List of tasks */
  tasks: Task[];
  /** Check if task is loading */
  loading: boolean;
  /** Failure message */
  failureMessage: string;
}
