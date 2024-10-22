import { Task } from '../entities/Task';
import { TaskId } from '../value-objects/TaskId';

export interface ITaskRepository {
  getAllTasks(): Promise<Task[]>;
  createTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(id: TaskId): Promise<void>;
}
