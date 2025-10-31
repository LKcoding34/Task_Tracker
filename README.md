# Task Tracker with Smart Insights

This repository contains a full-stack task tracking application with smart insights. It includes a Node.js/Express backend and a React frontend.

## Contents

- `backend/` — Express server, routes, authentication, and insights logic.
- `frontend/` — React app (Create React App-like structure).

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Git (optional)

## Quick start (Windows PowerShell)

Open two terminals (one for backend, one for frontend).

1) Backend

```powershell
# from the repository root
cd .\backend
npm install
# set environment variables (example values)
$env:PORT=5000; $env:JWT_SECRET="your_jwt_secret"; $env:DATABASE_URL="your_database_connection_string"
npm start
```

2) Frontend

```powershell
# from the repository root
cd .\frontend
npm install
npm start
```

The frontend typically runs on http://localhost:3000 and the backend on http://localhost:5000 (or the port you set).

## Environment variables

The backend may require some environment variables. Typical values (check `backend/*.js` files for exact names):

- `PORT` — port for Express server (default: 5000)
- `JWT_SECRET` — secret key used for signing JWT tokens
- `DATABASE_URL` or other DB-related variables — connection string or file path for the database

Set these in PowerShell with:

```powershell
$env:VARIABLE_NAME="value"
```

or create a `.env` file if the backend uses dotenv (check `backend/server.js` or `backend/db.js`).

## API (overview)

The backend folder contains routes under `backend/routes/` including `tasks.js`. Common endpoints you can expect:

- `POST /api/auth/login` — login user
- `POST /api/auth/register` — register user (if implemented)
- `GET /api/tasks` — list tasks for the authenticated user
- `POST /api/tasks` — create a task
- `PUT /api/tasks/:id` — update a task
- `DELETE /api/tasks/:id` — delete a task
- `GET /api/insights` — fetch computed insights

Note: Exact endpoints and auth requirements are implemented in `backend/routes/tasks.js`, `backend/auth.js`, and `backend/insights.js`. Inspect those files to confirm the exact path prefixes and payload shapes.

## Frontend

The React frontend lives in `frontend/src/` and contains components like `TaskList`, `TaskForm`, `TaskTimelineChart`, `InsightsPanel`, and authentication context in `context/AuthContext.js`.

It likely communicates with the backend through `frontend/src/api.js`. Ensure `api.js` points to the correct backend base URL (e.g., `http://localhost:5000`).

## File structure (highlight)

- backend/
  - auth.js
  - authMiddleware.js
  - db.js
  - insights.js
  - server.js
  - routes/
    - tasks.js

- frontend/
  - package.json
  - public/
  - src/
    - api.js
    - App.js
    - index.js
    - components/
    - context/
    - pages/

## Development notes & tips

- If you see CORS errors in the browser, ensure the backend allows requests from the frontend origin (port 3000). Check `backend/server.js` for CORS setup.
- If authentication fails, verify `JWT_SECRET` is set the same across restarts and in both dev environment and any stored tokens.
- If the frontend looks blank, open browser devtools and check console/network for errors.

## Running tests

No test runner is included by default. If tests are added, run them from the relevant package (`backend` or `frontend`) with `npm test`.

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Implement your changes
4. Open a pull request

## License

Add a license if you plan to open-source. This repository currently does not include a license file.

## Contact

If you have questions or need help running the project, open an issue in the repo or contact the maintainer.
