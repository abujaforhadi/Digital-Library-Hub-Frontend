# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configu# LibraryHub: A Minimal Library Management System 📚

Welcome to **LibraryHub**, a clean and functional client-side application for managing a library's book collection. This project, built with **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**, allows users to view, add, edit, delete, and borrow books seamlessly. It features a minimalist UI and demonstrates modern frontend development practices, including state management, API integration, and responsive design.

**Live Site:** [https://libraryhub25.vercel.app/](https://libraryhub25.vercel.app/)

-----

## Features

  - **Public Routes 🚀:** All features are publicly accessible without authentication.
  - **Full CRUD for Books 🛠️:**
      - **View All Books:** A comprehensive table displays all books with key details and action buttons.
      - **Add New Books:** A simple form to add new books to the library.
      - **Edit Books:** Update existing book information, which is instantly reflected in the UI.
      - **Delete Books:** A confirmation step ensures that books are not accidentally removed.
  - **Borrowing System 📖:**
      - **Borrow a Book:** A straightforward form to borrow available books.
      - **Quantity Validation:** The system prevents borrowing more copies than are available.
      - **Availability Status:** Books automatically become "unavailable" when all copies are borrowed.
  - **Borrow Summary 📊:**
      - An aggregated view showing the total number of times each book has been borrowed.
  - **Responsive Design 📱:** The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

-----

## Bonus Features

This project goes the extra mile with these premium features:

  - **Optimistic UI Updates ✨:** The UI updates instantly after an action (like adding or editing a book), assuming the API call will succeed. This provides a faster and smoother user experience.
  - **Toast Notifications 📢:** Users receive real-time feedback for their actions through non-intrusive toast notifications.
  - **Type-Safe Forms 🔒:** Forms are built with robust type-safety, reducing bugs and improving developer experience.

-----

## Technology Stack

  - **Frontend:** React, TypeScript
  - **State Management:** Redux Toolkit, RTK Query
  - **Styling:** Tailwind CSS
  - **Forms:** React Hook Form
  - **Schema Validation:** Zod
  - **UI Components:** Shadcn UI
  - **Notifications:** React Toastify

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

-----

## Project Structure

The project follows a feature-based folder structure to keep the code organized and maintainable.

```
src/
├── app/
│   ├── store.ts
│   └── api/
│       └── apiSlice.ts
├── components/
│   ├── ui/
│   └── shared/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── features/
│   ├── books/
│   │   ├── BookList.tsx
│   │   ├── AddBook.tsx
│   │   └── EditBook.tsx
│   └── borrow/
│       ├── BorrowBook.tsx
│       └── BorrowSummary.tsx
├── pages/
├── routes/
│   └── index.tsx
├── App.tsx
└── main.tsx
```

-----

## Available Scripts

In the project directory, you can run:

  - `npm run dev`: Runs the app in development mode.
  - `npm run build`: Builds the app for production.
  - `npm run lint`: Lints the code using ESLint.
  - `npm run preview`: Serves the production build locally.ration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

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

export default tseslint.config([
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
