import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

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

  const createTask = async (data) => {
    try {
      await api.post("/tasks", data);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

const updateTask = async (data) => {
  try {
    await api.put(`/tasks/${selectedTask._id}`, {
      title: data.title,
      description: data.description,
      completed: selectedTask.completed,
    });

    fetchTasks();
  } catch (err) {
    console.log(err.response?.data || err);
  }
};

  const toggleTask = async (task) => {
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
  };

  const deleteTask = async (task) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar
        user={user}
        onCreate={() => setCreateOpen(true)}
        onLogout={() => {
          logout();
          navigate("/");
        }}
      />

      <main className="max-w-6xl mx-auto p-6">

        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setSelectedTask(task);
            setEditOpen(true);
          }}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />

      </main>

      <CreateTaskModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createTask}
      />

      <EditTaskModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        onSave={updateTask}
      />

    </div>
  );
}