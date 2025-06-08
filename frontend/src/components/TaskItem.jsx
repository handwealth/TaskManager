export default function TaskItem({ task, onDelete }) {
  return (
    <li className="p-4 border rounded-md bg-gray-50 flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full 
          ${task.status === "todo" ? "bg-yellow-200 text-yellow-800" : 
            task.status === "in progress" ? "bg-blue-200 text-blue-800" : 
            "bg-green-200 text-green-800"}`}>
          {task.status}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 text-xl font-bold"
        title="Delete task"
      >
        &times;
      </button>
    </li>
  );
}
