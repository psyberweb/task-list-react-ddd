import React from "react";
import { Task } from "../../../domain/entities/Task";

interface TaskDetailProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCancel: () => void;
  task: Task | null;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onEditTask,
  onDeleteTask,
  onCancel,
}) => {
  if (!task) {
    return <div>No task selected</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <div>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Completed:</strong> {task.isCompleted.toString()}
        </p>
        <p>
          <strong>User:</strong> {task.userId}
        </p>
      </div>
      <div>
        <button onClick={() => onEditTask(task)}>Edit Task</button>
        <button onClick={() => onDeleteTask(task.id.value)}>Delete Task</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskDetail;
