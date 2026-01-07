# Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite. It utilizes Tailwind CSS for styling and `shadcn/ui` for UI components. The application is a Single Page Application (SPA) with routing handled by `react-router`. The project showcases the developer's journey, certifications, tech stack, and projects.

# Building and Running

The project uses `pnpm` as the package manager.

- **Install dependencies:**
  ```bash
  pnpm install
  ```
- **Run in development mode:**
  ```bash
  pnpm dev
  ```
- **Build for production:**
  ```bash
  pnpm build
  ```
- **Preview production build:**
  ```bash
  pnpm preview
  ```

# Development Conventions

- **Package Manager:** `pnpm`
- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** `shadcn/ui`
- **Routing:** `react-router`
- **Code Formatting & Linting:** Biome (configured via `biome.json` extending "ultracite") and Prettier.
  - **Format code:**
    ```bash
    pnpm format
    ```
  - **Lint code:**
    ```bash
    pnpm lint
    ```
- **Git Hooks:** Husky is used for git hooks (e.g., pre-commit checks).
