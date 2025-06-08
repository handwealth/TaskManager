import React from "react";

export default function TaskList({ tasks, onDelete, onEdit }) {
  if (!tasks.length) return <p className="text-center text-gray-500">No tasks available.</p>;

  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li key={task.id} className="p-4 border rounded shadow-sm bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <span className="text-xs px-2 py-1 bg-gray-200 rounded">{task.status}</span>
          </div>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:underline text-sm"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:underline text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
