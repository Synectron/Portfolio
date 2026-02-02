# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Portfolio (React + TypeScript + Vite)

  This repository contains a personal portfolio built with React, TypeScript and Vite. It uses TailwindCSS for styling and Radix UI primitives for accessible UI components.

  ## Highlights

  - Single-page portfolio with sections: Hero, About, Skills, Projects, Experience, Achievements and Contact.
  - Built with React 19 + TypeScript and Vite for fast dev feedback.
  - Tailwind CSS for utility-first styling.
  - Reusable UI components located under `src/components/ui`.

  ## Tech Stack

  - React 19
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI primitives

  ## Quick Start

  Prerequisites: Node.js (recommended 18+) and npm/yarn/pnpm.

  1. Install dependencies

     ```powershell
     npm install
     ```

  2. Run the development server

     ```powershell
     npm run dev
     ```

  3. Open the app in your browser at `http://localhost:5173` (Vite default).

  ## Scripts

  Available npm scripts (from `package.json`):

  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build the production site (`tsc -b && vite build`)
  - `npm run preview` — Preview the production build locally
  - `npm run lint` — Run ESLint

  ## Project Structure (important parts)

  - `src/sections` — Page sections used to compose the single-page app (e.g., `Contact.tsx`, `Projects.tsx`).
  - `src/components/ui` — Reusable UI primitives and components.
  - `src/lib` — Utility functions.

  ## Deploy

  Build the production bundle and deploy the contents of the `dist` folder to your static host (Netlify, Vercel, GitHub Pages, etc.)

  ```powershell
  npm run build
  # then upload `dist` to your host of choice
  ```

  ## Contributing

  This is a personal portfolio — changes are typically made by the owner. If you'd like to suggest improvements, open an issue or send a PR with a clear description of the change.

  ## Contact

  You can find contact details inside the `src/sections/Contact.tsx` or reach out via the links on the site.

  ---

  If you'd like, I can also:

  - add a short demo GIF or screenshot under `public/` and reference it in this README
  - add a `LICENSE` file or CI/deploy instructions (GitHub Actions)

  Let me know which additions you want and I will update the file.
