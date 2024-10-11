import React, { useEffect, useState } from 'react';
import { TaskService } from '../../../aplication/services/TaskService';
import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';
import { Task } from '../../../domain/entities/Task';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    await taskService.createTask(newTaskTitle);
    const updatedTasks = await taskService.getTasks();
    setTasks(updatedTasks);
    setNewTaskTitle('');
  };

  const handleToggleTask = async (task: Task) => {
    await taskService.toggleTaskCompletion(task);
    const updatedTasks = await taskService.getTasks();
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    const updatedTasks = await taskService.getTasks();
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task List</h1>
      <label htmlFor="new-task-title">New Task Title</label>
      <input
        id="new-task-title"
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter new task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id.value}>
            <span
              className={task.isCompleted ? 'completed-task' : 'pending-task'}
              onClick={() => handleToggleTask(task)}
            >
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task.id.value)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
