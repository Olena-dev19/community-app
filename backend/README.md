# Backend — Community App

This folder contains the backend server for the Community App built with Express and TypeScript. It provides REST endpoints for posts and nested comments and uses MongoDB via Mongoose.

Tech stack
- Node.js, TypeScript
- Express
- Mongoose (MongoDB)
- ts-node / nodemon for development

Prerequisites
- Node.js (recommended v18+)
- npm
- MongoDB (local or Atlas)

Environment
Create a `.env` file in this folder with at least the following variables:

```
MONGO_URL=mongodb://localhost:27017/community-app
PORT=5000
```

Tip: consider adding a `backend/.env.example` to the repo (do not commit secrets).

Install and run (development)

```zsh
cd backend
npm install
# create .env as shown above
npm run dev
```

What `npm run dev` does
- Uses `nodemon` watching `src` files and runs the server using `ts-node` loader:
  `nodemon --watch src --ext ts --exec "node --loader ts-node/esm src/server.ts"`

Default ports and base URL
- Server default port: `5000` (overridable via `PORT` env var)
- Base API URL used by the frontend: `http://localhost:5000/api`

Main files
- `src/server.ts` — express app entry
- `src/db/connectMongoDB.ts` — MongoDB connection logic
- `src/controllers` — application controllers for posts & comments
- `src/models` — Mongoose models for Post and Comment

API endpoints (summary)
- GET `/api/posts?page=1&limit=10` — list posts (pagination)
- POST `/api/posts` — create post; body: { title, content, userName }
- DELETE `/api/posts/:postId` — delete post and its comments
- GET `/api/posts/:postId/comments` — get comments tree for post
- POST `/api/posts/:postId/comments` — create comment/reply; body: { text, parentComment?, userName }
- DELETE `/api/posts/:postId/comments/:commentId` — delete comment and its replies

Notes and tips
- The backend expects `userName` to be provided when creating posts/comments. The frontend automatically injects this value from localStorage using an axios interceptor.
- Connection errors: check `MONGO_URL` and network access to MongoDB. Connection logs are printed by `src/db/connectMongoDB.ts`.
- Production: compile TypeScript to JavaScript (tsc) and run the compiled code with Node. Using `ts-node` in production is not recommended.

Suggested next improvements
- Add `backend/.env.example` to repository.
- Add tests (Jest or similar).
- Provide Dockerfile and `docker-compose.yml` (Mongo + backend + frontend) for easier local setup.

Contact
Author: Olena Gerich <gerichpingvin@gmail.com>
