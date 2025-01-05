import { RouterProvider } from "react-router-dom";
import { ViewProvider } from "./contexts/ViewContext";
import router from "./routes";

function App() {
  return (
    <ViewProvider>
      <RouterProvider router={router} />
    </ViewProvider>
  );
}

export default App;
