import React, { useState, useEffect } from "react";
import TaskList from "../../components/tasks/TaskList";
import TaskForm from "../../components/tasks/TaskForm";
import TaskDetail from "../../components/tasks/TaskDetail";
import { TaskService } from "../../../aplication/services/TaskService";
import { UserService } from "../../../aplication/services/UserService";
import { TaskRepository } from "../../../infrastructure/repositories/TaskRepository";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { Task } from "../../../domain/entities/Task";
import { User } from "../../../domain/entities/User";
import { UserId } from "../../../domain/value-objects/UserId";
import { useAuth } from "../../AuthContext";

const taskService = new TaskService(new TaskRepository());
const userService = new UserService(new UserRepository());

const TaskPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPage, setSelectedPage] = useState("list");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(new User(new UserId(), "", "", "", "", "", [0]));
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const allTasks = await taskService.getTasks();
      setTasks(allTasks);
    }
    fetchTasks();
    async function fetchUsers() {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
    if (user) setCurrentUser(user);
    setSelectedPage("list");
  }, []);

  const handleCreateOrUpdateTask = async (taskData: {
    title: string;
    description: string;
    isCompleted: boolean;
    userId: string;
  }) => {
    if (selectedTask) {
      const updatedTask = new Task(
        selectedTask.id,
        taskData.title,
        taskData.description,
        taskData.isCompleted,
        taskData.userId
      );
      await taskService.updateTask(updatedTask);
    } else {
      await taskService.createTask(
        taskData.title,
        taskData.description,
        taskData.userId
      );
    }
    const allTasks = await taskService.getTasks();
    setTasks(allTasks);
    setSelectedTask(null); // Limpa o formulário após a criação/edição
    setSelectedPage("list");
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setSelectedPage("form");
  };

  const handleDeleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    const allTasks = await taskService.getTasks();
    setTasks(allTasks);
    setSelectedPage("list");
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedPage("detail");
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedPage("form");
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setSelectedPage("list");
  };

  return (
    <div>
      {selectedPage === "list" && (
        <TaskList
          tasks={tasks}
          onSelectTask={handleSelectTask}
          onDeleteTask={handleDeleteTask}
          onAddNewTask={handleNewTask}
          onEditTask={handleEditTask}
        />
      )}
      {selectedPage === "form" && (
        <TaskForm
          onSubmit={handleCreateOrUpdateTask}
          onCancel={handleCancel}
          initialTask={selectedTask}
          currentUser={currentUser}
          users={users}
        />
      )}
      {selectedPage === "detail" && (
        <TaskDetail
          task={selectedTask}
          onCancel={handleCancel}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskPage;
