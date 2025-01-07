import {
  BoardTask,
  Completed,
  InProgress,
  MyTasksHeader,
  TodoTable,
} from "../components";
import { useView } from "../contexts/ViewContext";
import { PrivateLayout } from "../layout";

const MyTasksPage = () => {
  const { activeView } = useView();

  return (
    <PrivateLayout>
      {activeView === "list" && (
        <>
          <MyTasksHeader />
          <div className=" flex flex-col w-full gap-4 py-6 md:py-3 md:gap-7">
            <TodoTable />
            <InProgress />
            <Completed />
          </div>
        </>
      )}
      {activeView === "board" && (
        <div className="py-5">
          <BoardTask />
        </div>
      )}
    </PrivateLayout>
  );
};

export default MyTasksPage;
