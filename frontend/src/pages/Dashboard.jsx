import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import DeleteModal from "../components/DeleteModal";

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
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchTasks = async () => {
    setLoadingTasks(true);

    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (data) => {
    setCreating(true);

    try {
      await api.post("/tasks", data);

      const res = await api.post("/tasks", data);

      setTasks((prevTasks) => [...prevTasks, res.data.task]);

      setCreateOpen(false);

      setCreateOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  const updateTask = async (data) => {
    setSaving(true);

    try {
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

      setEditOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (task) => {
    setLoadingTaskId(task._id);

    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      const toggleTask = async (task) => {
        setLoadingTaskId(task._id);

        // Save the old value in case the request fails
        const oldCompleted = task.completed;

        // Update the UI immediately
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === task._id
              ? {
                  ...t,
                  completed: !t.completed,
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
          // Roll back if the API fails
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

          console.log(err);
        } finally {
          setLoadingTaskId(null);
        }
      };
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const deleteTask = async () => {
    setDeleting(true);

    try {
      await api.delete(`/tasks/${selectedTask._id}`);

      setTasks((prevTasks) =>
        prevTasks.filter((t) => t._id !== selectedTask._id),
      );

      setDeleteOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
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
    </div>
  );
}
