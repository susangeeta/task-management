import { useState } from "react";
import { MyTasksHeader, TaskTable } from "../components";
import { PrivateLayout } from "../layout";

const tasks = [
  {
    id: 1,
    title: "Interview with Design Team",
    data: "Today",
    taskStatus: "TO-DO",
    taskCategory: "Work",
  },
  {
    id: 2,
    title: "Project Planning Session",
    data: "30 Dec, 2024",
    taskStatus: "TO-DO",
    taskCategory: "Work",
  },
  {
    id: 3,
    title: "Code Review Meeting",
    data: "Today",
    taskStatus: "TO-DO",
    taskCategory: "Work",
  },
];

const MyTasksPage = () => {
  const [openTodoPanel, setOpenTodoPanel] = useState(false);
  const [openInProgressPanel, setOpenInProgressPanel] = useState(false);

  return (
    <PrivateLayout>
      <MyTasksHeader />
      <div className="flex flex-col w-full gap-10">
        <TaskTable
          key={1}
          tasks={tasks}
          open={openTodoPanel}
          totalTasks={10}
          heading="My Tasks"
          onClose={() => setOpenTodoPanel(!openTodoPanel)}
          bgColor="bg-background-todo-color"
        />

        <TaskTable
          key={2}
          tasks={tasks}
          open={openInProgressPanel}
          totalTasks={10}
          heading="My Tasks"
          onClose={() => setOpenInProgressPanel(!openInProgressPanel)}
          bgColor="bg-background-todo-color"
        />
      </div>
    </PrivateLayout>
  );
};

export default MyTasksPage;
