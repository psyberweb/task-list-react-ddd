import api from '../api/api';  // Importando a instância configurada
import { ITaskRepository } from '../../domain/irepositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskId } from '../../domain/value-objects/TaskId';

export class TaskRepository implements ITaskRepository {
  private readonly apiUrl = '/tasks'; // Base para a rota de tarefas

  async getAllTasks(): Promise<Task[]> {
    const response = await api.get(this.apiUrl);
    return response.data.map(
      (taskData: any) =>
        new Task(new TaskId(taskData.id), taskData.title, taskData.isCompleted)
    );
  }

  async createTask(task: Task): Promise<void> {
    await api.post(this.apiUrl, {
      id: task.id.value,
      title: task.title,
      isCompleted: task.isCompleted
    });
  }

  async updateTask(task: Task): Promise<void> {
    await api.put(`${this.apiUrl}/${task.id.value}`, {
      title: task.title,
      isCompleted: task.isCompleted
    });
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(`${this.apiUrl}/${id}`);
  }
}
