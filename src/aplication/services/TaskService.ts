import { ITaskRepository } from '../../domain/irepositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskId } from '../../domain/value-objects/TaskId';

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.getAllTasks();
  }

  async createTask(title: string, description: string, userId: string): Promise<void> {
    const newTask = new Task(new TaskId(), title, description, false, userId);
    await this.taskRepository.createTask(newTask);
  }

  async updateTask(task: Task): Promise<void> {
    await this.taskRepository.updateTask(task);
  }

  async toggleTaskCompletion(task: Task): Promise<void> {
    task.toggleCompleted();
    await this.taskRepository.updateTask(task);
  }

  async deleteTask(id: string): Promise<void> {
    const taskId = new TaskId(id);
    await this.taskRepository.deleteTask(taskId);
  }
}
