import { Completed, InProgress, MyTasksHeader, TodoTable } from "../components";
import { useView } from "../contexts/ViewContext";
import { PrivateLayout } from "../layout";

const MyTasksPage = () => {
  const { activeView } = useView();

  return (
    <PrivateLayout>
      {activeView === "list" && (
        <>
          <MyTasksHeader />
          <div className="flex flex-col w-full gap-10">
            <TodoTable />
            <InProgress />
            <Completed />
          </div>
        </>
      )}
    </PrivateLayout>
  );
};

export default MyTasksPage;
