import { FaCheckCircle, FaRegCircle, FaPen, FaTrash } from "react-icons/fa";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">

      {/* Left */}
      <div className="flex items-start gap-4">

        <button
          onClick={onToggle}
          className="mt-1 transition hover:scale-110"
        >
          {task.completed ? (
            <FaCheckCircle className="text-2xl text-green-500" />
          ) : (
            <FaRegCircle className="text-2xl text-slate-400 hover:text-blue-500" />
          )}
        </button>

        <div>

          <h3
            className={`text-lg font-semibold transition ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-800"
            }`}
          >
            {task.title}
          </h3>

          <p
            className={`mt-1 text-sm transition ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-500"
            }`}
          >
            {task.description}
          </p>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <button
          onClick={onEdit}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-slate-100
            text-slate-600
            transition
            hover:bg-slate-200
          "
        >
          <FaPen size={14} />
        </button>

        <button
          onClick={onDelete}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-red-50
            text-red-500
            transition
            hover:bg-red-100
          "
        >
          <FaTrash size={14} />
        </button>

      </div>

    </div>
  );
}   