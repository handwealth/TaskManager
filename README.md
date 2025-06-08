# Task Manager

A simple full-stack Task Manager application built with Node.js (Express) backend and React frontend.

![image](https://github.com/user-attachments/assets/40b78f80-85d6-4d51-932b-0346b19d8304)
![image](https://github.com/user-attachments/assets/1c3ca1cb-ee95-4b0d-8b8d-a51f6bf58089)
![image](https://github.com/user-attachments/assets/b9106c21-a19d-479e-bda0-6903de8c445f)

### Working demo video of the app
![demo video](https://www.loom.com/share/134f6e0a7b2b4577b22fc18f26bafa2f?sid=37b61452-87e6-40e8-8b68-97e89a9d0fb2)

## Features

- Fetch all tasks from the backend API
- Add a new task with title, description, and status
- Update an existing task
- Persist tasks in a JSON file on the backend

## Project Structure

TaskManager/
├── backend/
│ ├── server.js # Express server with REST API for tasks
│ ├── tasks.json # JSON file storing tasks data
│ └── package.json # Backend dependencies
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── TaskForm.jsx
│ │ │ └── TaskList.jsx
│ │ └── App.jsx # React app entry point
│ └── package.json # Frontend dependencies
└── docker-compose.yml # Docker Compose config to run backend & frontend

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/get-npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) if you want to run using Docker

---

### Running Locally (Without Docker)

1. **Start Backend**

-bash
cd backend
npm install
node server.js
The backend server will start at: http://localhost:5000

Start Frontend

In a new terminal window:

cd frontend
npm install
npm start
The frontend React app will start at: http://localhost:3000

---

*Running With Docker Compose*

Build and start both services:
docker compose up --build
Access frontend at http://localhost:3000. The frontend will communicate with backend at http://localhost:5000.

To stop the services:

docker compose down

## 🔄 Caching with LocalStorage

To improve performance, the app uses basic client-side caching:

- On app load, tasks are first loaded from `localStorage` (if available).
- If not cached, tasks are fetched from the backend and cached.
- When tasks are added or deleted, both the app state and the localStorage cache are updated.
- A "🔄 Refresh" button lets users manually re-fetch the latest tasks from the backend.

### Why?
This improves responsiveness by avoiding unnecessary backend requests on every page load.

### Notes
- Tasks are stored persistently in backend/tasks.json.
- Make sure ports 3000 (frontend) and 5000 (backend) are free before running.
- The frontend caches tasks in localStorage to improve load speed.
