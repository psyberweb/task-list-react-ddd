import React from "react";
import { Task } from "../../../domain/entities/Task";

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddNewTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onSelectTask,
  onDeleteTask,
  onAddNewTask,
  onEditTask,
}) => {
  return (
    <div>
      <h2>Task List</h2>
      <button onClick={onAddNewTask}>Add New Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id.value}>
            {task.title} - {task.isCompleted.toString()}
            <button onClick={() => onSelectTask(task)}>Select</button>
            <button onClick={() => onEditTask(task)}>Edit</button>
            <button onClick={() => onDeleteTask(task.id.value)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
