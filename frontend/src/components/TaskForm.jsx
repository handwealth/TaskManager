import React from "react";

export default function TaskForm({ form, setForm, onSubmit, editing }) {
  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <select
        className="w-full border rounded px-3 py-2"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="todo">Todo</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {editing ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}
