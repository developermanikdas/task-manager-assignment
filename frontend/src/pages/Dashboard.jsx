import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import DeleteModal from "../components/DeleteModal";
import { getErrorMessage } from "../utils/errorHandler";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleApiError = (err) => {
    console.error(err);

    setError(getErrorMessage(err));
    setOpenSnackbar(true);

    if (err.response?.status === 401) {
      logout();
      navigate("/");
    }
  };

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      setError("");
      const { data } = await api.get("/tasks");

      setTasks(data.tasks || []);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const createTask = async (data) => {
    setCreating(true);

    try {
      setError("");
      const res = await api.post("/tasks", data);

      setTasks((prevTasks) => [...prevTasks, res.data.task]);

      setCreateOpen(false);
    } catch (err) {
      handleApiError(err);
    } finally {
      setCreating(false);
    }
  };

  const updateTask = async (data) => {
    setSaving(true);

    try {
      setError("");
      await api.put(`/tasks/${selectedTask._id}`, {
        title: data.title,
        description: data.description,
        completed: selectedTask.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === selectedTask._id
            ? {
                ...t,
                title: data.title,
                description: data.description,
              }
            : t,
        ),
      );

      setEditOpen(false);
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (task) => {
    setLoadingTaskId(task._id);

    // Save current value
    const oldCompleted = task.completed;

    // Update UI immediately
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t._id === task._id
          ? {
              ...t,
              completed: !oldCompleted,
            }
          : t,
      ),
    );

    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !oldCompleted,
      });
    } catch (err) {
      // Rollback if API fails
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id
            ? {
                ...t,
                completed: oldCompleted,
              }
            : t,
        ),
      );

      handleApiError(err);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const deleteTask = async () => {
    try {
      setDeleting(true);

      // Clear previous error
      setError("");

      await api.delete(`/tasks/${selectedTask._id}`);

      setTasks((prev) => prev.filter((t) => t._id !== selectedTask._id));

      setDeleteOpen(false);
      setSelectedTask(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
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
          loading={loadingTasks}
          loadingTaskId={loadingTaskId}
          onEdit={(task) => {
            setSelectedTask(task);
            setEditOpen(true);
          }}
          onDelete={(task) => {
            setSelectedTask(task);
            setDeleteOpen(true);
          }}
          onToggle={toggleTask}
        />
      </main>

      <CreateTaskModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createTask}
        creating={creating}
      />

      <EditTaskModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        onSave={updateTask}
        saving={saving}
      />

      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteTask}
        deleting={deleting}
      />

      <Fab
        color="primary"
        aria-label="new-task"
        onClick={() => setCreateOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
