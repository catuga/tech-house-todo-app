export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  description: string;
}

export interface TasksResponse {
  items: Task[];
  total: number;
  totalPages: number;
}

export interface NewTask {
  title: string;
  description: string;
}

export interface CreateTaskResponse {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
