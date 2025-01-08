import "react-quill/dist/quill.snow.css";
import { RouterProvider } from "react-router-dom";
import { TaskFilterProvider } from "./contexts/TaskFilter";
import { ViewProvider } from "./contexts/ViewContext";
import router from "./routes";

function App() {
  return (
    <ViewProvider>
      <TaskFilterProvider>
        <RouterProvider router={router} />
      </TaskFilterProvider>
    </ViewProvider>
  );
}

export default App;
