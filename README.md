## 🔄 Caching with LocalStorage

To improve performance, the app uses basic client-side caching:

- On app load, tasks are first loaded from `localStorage` (if available).
- If not cached, tasks are fetched from the backend and cached.
- When tasks are added or deleted, both the app state and the localStorage cache are updated.
- A "🔄 Refresh" button lets users manually re-fetch the latest tasks from the backend.

### Why?

This improves responsiveness by avoiding unnecessary backend requests on every page load.
