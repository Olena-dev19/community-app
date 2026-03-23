## Community App

This repository is a monorepo containing the backend and frontend for a simple community application supporting posts and nested comments.

Quick summary:

- Technologies: Node.js (TypeScript), Express, MongoDB, Mongoose, Vite + React (TypeScript), Redux Toolkit, Axios
- Structure: monorepo with two workspaces: `backend` and `frontend`

Author: Olena Gerich

## What the app does

- On first visit the user enters their name (stored in localStorage).
- Users can create posts (title, content).
- Each post can have comments and nested replies (threaded comments).
- Deleting a post deletes all related comments.

## Repository structure (important files)

- `backend/` — Express + TypeScript server
  - `src/server.ts` — server entry point
  - `src/db/connectMongoDB.ts` — MongoDB connection (uses MONGO_URL env var)
  - `src/controllers` — controllers: `postsController.ts`, `commentsController.ts`
  - `src/models` — Mongoose models `Post` and `Comment`
- `frontend/` — React + Vite + TypeScript client
  - `src/api/api/api.ts` — axios instance with baseURL `http://localhost:5000/api` and an interceptor that attaches userName from localStorage
  - `src/features` — Redux Toolkit slices for `posts`, `comments`, and `user`
  - `src/components` — UI components (UserModal, HomePage, AddPost, Comments, etc.)

## Prerequisites

- Node.js (recommended v18+)
- npm or pnpm
- MongoDB (local or MongoDB Atlas)

## Environment variables

Create a `.env` file inside the `backend` folder with at least:

```
MONGO_URL=mongodb://localhost:27017/community-app
PORT=5000
```

If you use MongoDB Atlas, replace the MONGO_URL with your connection string.

## Install and run locally

There is a top-level `dev` script that runs both backend and frontend in parallel (workspaces). Two options:

1. Quick (from the repository root, if your npm supports workspaces):

```zsh
npm install
npm run dev
```

This will run:

- backend: `nodemon --watch src --ext ts --exec "node --loader ts-node/esm src/server.ts"` (default port 5000)
- frontend: `vite` (default port 5173)

2. Manual (run each workspace separately):

```zsh
# backend
cd backend
npm install
# create .env as described above
npm run dev

# in another terminal — frontend
cd frontend
npm install
npm run dev
```

After both services are running the frontend will call the API at `http://localhost:5000/api`.

## API (main endpoints)

- GET /api/posts?page=1&limit=10 — get list of posts (pagination)
- POST /api/posts — create a new post
  - body: { title, content, userName }
- DELETE /api/posts/:postId — delete a post (and all its comments)

- GET /api/posts/:postId/comments — get comments for a post (returns a tree: top-level comments with nested `replies` arrays)
- POST /api/posts/:postId/comments — create a comment or reply
  - body: { text, parentComment?, userName }
- DELETE /api/posts/:postId/comments/:commentId — delete a comment and all its replies recursively

Notes:

- The backend expects `userName` when creating posts/comments. The frontend adds the name from localStorage using an axios request interceptor.

## Frontend behavior and important details

- On first load the `UserModal` prompts the user for a name — the name is stored in localStorage under the `user` key.
- `AddPost` component allows creating a post; posts are stored in Redux (`postsSlice`).
- Each post supports viewing, fetching and creating comments via `commentsSlice`.
- Comments are represented as a tree on the frontend (each comment may include a `replies` array).

## Debugging tips

- If the server won't start, check that `MONGO_URL` is set in the backend `.env` and that MongoDB is reachable.
- Connection logs are printed by `backend/src/db/connectMongoDB.ts`.
- If the frontend can't reach the API, ensure the backend is listening on port 5000 and that `src/api/api/api.ts` has the correct baseURL.
- If ports conflict, you can change the Vite port in the frontend or add a proxy.

## Possible improvements / next steps

- Add authentication (JWT) and persistent user accounts
- Add authorization to restrict deletion of posts/comments
- Add tests (unit and integration) for backend and frontend
- Add Dockerfile / docker-compose for local development with MongoDB

## Production build notes

- Frontend: run `npm run build` inside the `frontend` folder to create a production bundle via Vite
- Backend: current development workflow uses `ts-node`. For production it is recommended to compile TypeScript to JavaScript and run the resulting Node process.

## Contact

Author: Olena Gerich <gerichpingvin@gmail.com>

---

If you want, I can:

- add a `backend/.env.example` file;
- prepare a `docker-compose.yml` to start MongoDB and the services quickly;
- describe the public API in OpenAPI/Swagger format.
