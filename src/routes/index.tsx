import { createBrowserRouter } from "react-router-dom";
import { Home, MyTasks } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-tasks",
    element: <MyTasks />,
  },
]);

export default router;
