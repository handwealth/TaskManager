const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000; // ✅ Define the port

app.use(cors());
app.use(express.json());

// Load tasks from JSON file
let tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
app.get("/health", (req, res) => {
  res.send("✅ Running local Node.js + JSON backend");
});

// Get all tasks
app.get("/tasks", (req, res) => res.json(tasks));

// Add a new task
app.post("/tasks", (req, res) => {
  const newTask = { ...req.body, id: Date.now() };
  tasks.push(newTask);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2)); // Optional persistence
  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).send();

  tasks[index] = { ...tasks[index], ...req.body };
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2)); // optional persistence
  res.json(tasks[index]);
});


// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2)); // Optional persistence
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
