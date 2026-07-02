import Button from "./Button";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        border
        p-5
        hover:shadow-lg
        transition
      "
    >
      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-semibold">
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            task.completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

      </div>

      <div className="flex gap-3 mt-6">

        <Button
          variant="secondary"
          onClick={onEdit}
        >
          Edit
        </Button>

        <Button
          variant="success"
          onClick={onToggle}
        >
          {task.completed
            ? "Mark Pending"
            : "Mark Complete"}
        </Button>

        <Button
          variant="danger"
          onClick={onDelete}
        >
          Delete
        </Button>

      </div>

    </div>
  );
}