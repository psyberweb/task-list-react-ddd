import React, { useState, useEffect } from "react";
import { Task } from "../../../domain/entities/Task";
import { User } from "../../../domain/entities/User";
import { UserId } from "../../../domain/value-objects/UserId";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    isCompleted: boolean;
    userId: string;
  }) => void;
  onCancel: () => void;
  initialTask?: Task | null;
  currentUser: User;
  users: User[];
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTask,
  currentUser,
  users,
}) => {
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    isCompleted: false,
    userId: currentUser.roles.includes(2) ? currentUser.id.toString() : "",
  });

  useEffect(() => {
    if (initialTask) {
      setTaskForm({
        title: initialTask.title,
        description: initialTask.description,
        isCompleted: initialTask.isCompleted,
        userId:
          initialTask.userId || (currentUser.roles.includes(2) ? currentUser.id.toString() : ""),
      });
    }
  }, [initialTask, currentUser]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskForm);
  };

  return (
    <div>
      <h2>Task Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskForm.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskForm.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isCompleted">Completed</label>
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            checked={taskForm.isCompleted}
            onChange={(e) =>
              setTaskForm({ ...taskForm, isCompleted: e.target.checked })
            }
          />
        </div>
        {currentUser.roles.includes(1) && (
          <div>
            <label htmlFor="userId">Assign to</label>
            <select
              id="userId"
              name="userId"
              value={taskForm.userId.toString()}
              onChange={handleChange}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id.value} value={user.id.value}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <button type="submit">
            {initialTask ? "Update Task" : "Submit Task"}
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
