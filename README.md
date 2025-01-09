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

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import your Firestore instance

const PAGE_SIZE = 8; // Number of tasks per page

const YourComponent = ({ user, category, search }) => {
const [todos, setTodos] = useState<Task[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [lastVisible, setLastVisible] = useState<any>(null); // Store the last visible document for pagination
const [isLastPage, setIsLastPage] = useState<boolean>(false); // Check if it's the last page

useEffect(() => {
if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do"),
      orderBy("dueDate", "desc"), // Adjust this to order by any field you prefer
      limit(PAGE_SIZE) // Limit the number of tasks per page
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    // Fetch tasks with pagination
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));

      const filteredTasks = todosData.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );

      setTodos(filteredTasks);
      setLoading(false);

      // Get the last document to use in the next query for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // If the number of docs is less than PAGE_SIZE, it's the last page
      setIsLastPage(querySnapshot.docs.length < PAGE_SIZE);
    });

    return () => unsubscribe();

}, [user.uid, category, search]);

// Function to load more tasks (pagination)
const loadMore = () => {
if (isLastPage || !lastVisible) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do"),
      orderBy("dueDate", "desc"),
      startAfter(lastVisible), // Start the query after the last visible document
      limit(PAGE_SIZE)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    // Fetch the next page of tasks
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));

      const filteredTasks = todosData.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );

      setTodos((prevTasks) => [...prevTasks, ...filteredTasks]);

      // Get the last document to use in the next query for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // If the number of docs is less than PAGE_SIZE, it's the last page
      setIsLastPage(querySnapshot.docs.length < PAGE_SIZE);
    });

    return () => unsubscribe();

};

return (
<div>
{/_ Render tasks _/}
{loading ? (
<p>Loading...</p>
) : (
todos.map((task) => (
<div key={task.id}>{task.title}</div>
))
)}

      {/* Button to load more */}
      {!isLastPage && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>

);
};

export default YourComponent;
