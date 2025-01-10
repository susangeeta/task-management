import { useState } from "react";
import Swal from "sweetalert2";
import { vectorIcon, whiteCrossIcon } from "../assets/svg";
import {
  BoardTask,
  Completed,
  InProgress,
  MyTasksHeader,
  TodoTable,
} from "../components";
import { useView } from "../contexts/ViewContext";
import useDb from "../hooks/useDb";
import { PrivateLayout } from "../layout";

const MyTasksPage = () => {
  const { activeView } = useView();
  const [taskIds, setTaskIds] = useState<string[]>([]);
  const { findByIdAndDelete, findByIdAndUpdate } = useDb();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteMultipleTasks = async () => {
    if (taskIds.length === 0) return;
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete ${taskIds.length} tasks! This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            taskIds.map((id) => findByIdAndDelete("tasks", id))
          );

          setTaskIds([]);
          Swal.fire(
            "Deleted!",
            "The selected tasks have been deleted.",
            "success"
          );
        } catch (error) {
          Swal.fire("Error", (error as Error).message, "error");
        }
      }
    });
  };

  const handleStatusUpdate = async (status: string) => {
    try {
      await Promise.all(
        taskIds.map((taskId) => findByIdAndUpdate("tasks", taskId, { status }))
      );
      setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateLayout>
      {activeView === "list" && (
        <div className="pb-20">
          <MyTasksHeader />
          <div className="flex flex-col w-full gap-4 py-3 md:py-3 md:gap-7">
            <TodoTable taskIds={taskIds} setTaskIds={setTaskIds} />
            <InProgress taskIds={taskIds} setTaskIds={setTaskIds} />
            <Completed taskIds={taskIds} setTaskIds={setTaskIds} />
          </div>
          {taskIds.length > 1 && (
            <div className="flex items-center justify-center">
              <div className="bg-background-custom-black h-[52px] w-[356px] fixed bottom-1 rounded-xl flex items-center px-2 justify-between">
                <div className="flex items-center gap-2">
                  <button className="text-white flex gap-6 items-center text-xxxl font-semibold rounded-xl custom-font border border-[#FFFFFF] px-3 py-1">
                    {taskIds.length} Tasks Selected
                    <img onClick={() => setTaskIds([])} src={whiteCrossIcon} />
                  </button>
                  <img src={vectorIcon} />
                </div>
                <div className="flex gap-2 items-center relative">
                  <div>
                    <button
                      onClick={() => setIsPopupOpen(!isPopupOpen)}
                      className="bg-background-custom-black text-white custom-font font-semibold w-[63px] h-[27px] rounded-xl border border-[#FFFFFF] text-xxxl"
                    >
                      Status
                    </button>
                    {isPopupOpen && (
                      <div className="absolute -top-[7.4rem]  rounded-xl overflow-hidden h-[100px] w-[8rem] flex flex-col gap-2 bg-background-custom-black shadow-lg">
                        <div className="text-xxxl font-semibold flex flex-col gap-2 p-3 items-start text-white ">
                          <button
                            onClick={() => handleStatusUpdate("to-do")}
                            className="custom-font uppercase"
                          >
                            To-Do
                          </button>
                          <button
                            onClick={() => handleStatusUpdate("inprogress")}
                            className="custom-font uppercase"
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => handleStatusUpdate("completed")}
                            className="custom-font uppercase"
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleDeleteMultipleTasks}
                    className="bg-[#3a1f23] text-[#E13838] custom-font font-semibold w-[63px] h-[27px] rounded-xl border border-[#E13838] text-xxxl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
