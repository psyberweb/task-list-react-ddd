import { Task } from '../entities/Task';

export interface ITaskRepository {
  getAllTasks(): Promise<Task[]>;
  createTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
}
