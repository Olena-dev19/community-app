# Frontend — Community App

This folder contains the frontend client for the Community App built with React, Vite and TypeScript. The client communicates with the backend API for posts and comments.

Tech stack
- React + TypeScript
- Vite (dev server and build)
- Redux Toolkit for state management
- Axios for HTTP requests

Prerequisites
- Node.js (recommended v18+)
- npm

Install and run (development)

```zsh
cd frontend
npm install
npm run dev
```

Default dev server
- Vite dev server runs on port `5173` by default. The frontend calls the backend API at `http://localhost:5000/api` (configured in `src/api/api/api.ts`).

Available scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build for production (compiles TypeScript and runs Vite build)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

Important files & folders
- `src/api/api/api.ts` — axios instance with baseURL and interceptor that attaches `userName` from localStorage
- `src/features` — Redux slices: `posts`, `comments`, `user`
- `src/components` — main UI components: `UserModal`, `HomePage`, `AddPost`, `Comments`, etc.

Frontend behavior
- On first load the app asks the user to enter a name (stored in localStorage under `user`).
- Creating posts adds them to the Redux store and persists them through the backend API.
- Comments are fetched per-post and rendered as a nested tree. Replies are handled recursively both on backend and frontend.

Build / Production
- To build the frontend for production:

```zsh
cd frontend
npm run build
```

- The output is placed in `dist/` (Vite default). Serve these static files with any static server or deploy to hosting (Netlify, Vercel, static server behind a reverse proxy, etc.).

Debugging tips
- If the app doesn't load posts or comments, ensure the backend is running on `http://localhost:5000` and that `src/api/api/api.ts` uses the correct baseURL.
- Check the browser console for failed network requests and inspect the request payloads/response codes.

Next steps / improvements
- Add client-side validations and better error UI
- Add tests (React Testing Library / Cypress)
- Add environment-based configuration for API base URL

Contact
Author: Olena Gerich <gerichpingvin@gmail.com>
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
