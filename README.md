# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

Overview
This Task Management Application is designed to help users efficiently manage their tasks, ensuring better productivity and organization. The application includes user authentication, advanced task categorization, and a user-friendly interface for task handling.

Features
User Authentication
Firebase Authentication with Google Sign-In.
Secure profile management for each user.
Task Management
Create, edit, and delete tasks.
Categorize tasks (e.g., Work, Personal) and tag them for easier filtering.
Set due dates and rearrange tasks using drag-and-drop functionality.
Sort tasks by due dates (ascending/descending).
Batch Actions
Perform batch operations like deleting or marking multiple tasks as complete.
Task History and Activity Log
View an activity log that tracks task creation, edits, and deletions.
Filter Options
Filter tasks by tags, categories, and date ranges.
Search tasks by title.
Board/List View
Switch between a Kanban-style board view and a standard list view.
Responsive Design
Fully responsive with a mobile-first design, ensuring seamless usage across devices.
Installation and Running the Project
Clone the Repository

bash
Copy code
git clone https://github.com/susangeeta/task-management.git  
cd repo-name  
Install Dependencies
bash
npm start  
Build for Production

bash
Copy code
npm run build  
Deployment
The live version of this application is available here:
Live Application URL
Challenges and Solutions
Solution: Used the react-beautiful-dnd library to implement a seamless drag-and-drop experience for task rearrangement.
Challenge 2: Managing Real-Time Updates with Firebase
Solution: Utilized Firebase Realtime Database and React Query to ensure efficient and consistent data fetching and state synchronization.
Challenge 3: Responsive Design
Solution: Adopted a mobile-first design approach using CSS and Tailwind CSS to ensure a smooth user experience across all devices.
