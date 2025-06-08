import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "todo" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("tasks");
    if (cached) {
      setTasks(JSON.parse(cached));
    } else {
      axios.get(API)
        .then(res => {
          setTasks(res.data);
          localStorage.setItem("tasks", JSON.stringify(res.data));
        })
        .catch(() => alert("Failed to fetch tasks"));
    }
  }, []);

  const syncCache = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddOrUpdate = () => {
    if (!form.title.trim()) return alert("Title is required");

    if (editingId) {
      // ✅ Update task
      
      axios.put(`${API}/${editingId}`, form)
        .then(res => {
          const updated = tasks.map(task =>
            task.id === editingId ? res.data : task
          );
          syncCache(updated);
          setEditingId(null);
          setForm({ title: "", description: "", status: "todo" });
        })
        .catch(() => alert("Failed to update task"));
    } else {
      // ✅ Add task
      axios.post(API, form)
        .then(res => {
          const updated = [...tasks, res.data];
          syncCache(updated);
          setForm({ title: "", description: "", status: "todo" });
        })
        .catch(() => alert("Failed to add task"));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => {
        const updated = tasks.filter(task => task.id !== id);
        syncCache(updated);
      })
      .catch(() => alert("Failed to delete task"));
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description, status: task.status });
    setEditingId(task.id);
  };

  const refreshTasks = () => {
    axios.get(API)
      .then(res => syncCache(res.data))
      .catch(() => alert("Failed to refresh tasks"));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">📝 Task Manager</h1>
          <button
            onClick={refreshTasks}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔄 Refresh
          </button>
        </div>
        <TaskForm
          form={form}
          setForm={setForm}
          onSubmit={handleAddOrUpdate}
          editing={!!editingId}
        />
        <hr className="my-6" />
        <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
}
