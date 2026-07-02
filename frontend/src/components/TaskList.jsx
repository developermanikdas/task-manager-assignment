import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Tasks Yet</h2>

        <p className="text-gray-500 mt-2">
          Click "New Task" to create your first task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          onToggle={() => onToggle(task)}
        />
      ))}
    </div>
  );
}
