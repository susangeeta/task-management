import { createBrowserRouter } from "react-router-dom";
import { MyTasksPage, OnbaordPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnbaordPage />,
  },
  {
    path: "/my-tasks",
    element: <MyTasksPage />,
  },
]);

export default router;
