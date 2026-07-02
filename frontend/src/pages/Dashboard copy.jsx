import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", form);

      setForm({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <h3>Welcome {user?.name}</h3>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>

      <hr />

      <h2>Create Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      <h2>Your Tasks</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? "✅ Completed" : "⏳ Pending"}</p>
            <button
              onClick={async () => {
                try {
                  await api.put(`/tasks/${task._id}`, {
                    title: task.title,
                    description: task.description,
                    completed: !task.completed,
                  });

                  fetchTasks();
                } catch (err) {
                  console.log(err);
                }
              }}
              style={{ marginLeft: "10px" }}
            >
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>{" "}
            &nbsp;
            <button
              onClick={async () => {
                const title = prompt("New Title", task.title);

                if (!title) return;

                const description = prompt("New Description", task.description);

                if (description === null) return;

                try {
                  await api.put(`/tasks/${task._id}`, {
                    title,
                    description,
                    completed: task.completed,
                  });

                  fetchTasks();
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this task?",
                );

                if (!confirmDelete) return;

                deleteTask(task._id);
              }}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
