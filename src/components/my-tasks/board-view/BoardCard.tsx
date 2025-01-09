import { useState } from "react";
import Swal from "sweetalert2";
import { EditModal } from "../..";
import { deleteIcon, editIcon, moreIcon } from "../../../assets/svg";
import useDb from "../../../hooks/useDb";
import { Task } from "../list-view/TodoTable";

type BoardTaskProps = {
  tasks: Task[];
  bgColor: string;
  heading: string;
  loading: boolean;
};

const BoardTask: React.FC<BoardTaskProps> = ({
  tasks,
  bgColor,
  heading,
  loading,
}) => {
  const [openMoreOption, setOpenMoreOption] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openEditModal, setEditModal] = useState(false);
  const { findByIdAndDelete } = useDb();

  const handleDeleteTask = async (docId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await findByIdAndDelete("tasks", docId);
          if (isDeleted) {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error", (error as Error).message, "error");
        }
      }
    });
  };

  const openClosePopUp = (id: string) => {
    setOpenMoreOption((prev) => (prev === id ? null : id));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModal(true);
    setOpenMoreOption(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}   ${month},${year}`;
  };
  return (
    <div className="bg-background-todo-bg h-[40rem] overflow-y-auto overflow-hidden rounded-xl border border-[#58575112]">
      <div className="p-3">
        <button
          className={`text-[14px] custom-font font-medium text-black px-3 py-1 w-fit rounded ${bgColor}`}
        >
          {heading}
        </button>
      </div>

      <div className="flex items-center p-3 flex-col  gap-5 ">
        {loading && <p className="p-4">Loading tasks...</p>}
        {tasks?.map((item: Task) => (
          <div
            key={item.id}
            className="bg-white w-full  flex flex-col justify-between p-3 rounded-xl  border border-text-dark/20"
          >
            <div className="flex flex-col justify-between h-24 gap-2 ">
              <div className="flex justify-between items-center">
                <h1 className="text-[16px] custom-font font-bold text-black ">
                  {item.title}
                </h1>
                <div className="relative">
                  <img
                    onClick={() => openClosePopUp(item.id)}
                    src={moreIcon}
                    alt="Options"
                    className="cursor-pointer"
                  />
                  {openMoreOption === item.id && (
                    <div className="absolute right-0 top-3 rounded-xl overflow-hidden  h-[76px] w-[134px] p-2 flex flex-col gap-2 bg-white border-2 border-[#7B19841F] shadow-lg z-10">
                      <button
                        onClick={() => handleEditTask(item)}
                        className="flex px-1 items-center gap-2 text-base font-semibold custom-font text-[#000000] w-full hover:bg-gray-50 rounded transition-colors"
                      >
                        <img src={editIcon} alt="Edit" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(item.id)}
                        className="flex px-1 text-base gap-2 font-semibold items-center custom-font text-[#DA2F2F] w-full hover:bg-gray-50 rounded transition-colors"
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="h-4 w-4"
                        />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-sm ">
                <span className="capitalize text-sm font-semibold text-text-dark/50 custom-font">
                  {item.status}
                </span>
                <span className="capitalize text-sm font-semibold text-text-dark/50 custom-font">
                  {formatDate(item?.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {openEditModal && selectedTask && (
          <EditModal
            openEditModal={openEditModal}
            setEditModal={setEditModal}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </div>
    </div>
  );
};

export default BoardTask;
