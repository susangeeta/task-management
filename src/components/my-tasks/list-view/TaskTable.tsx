import { useState } from "react";
import Swal from "sweetalert2";
import { EditModal } from "../..";
import {
  checkMark,
  deleteIcon,
  downIcon,
  dragIcon,
  editIcon,
  moreIcon,
} from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";
import Dropdown from "../../../common/Dropdown";
import useDb from "../../../hooks/useDb";
import AddTaskTodoTable from "./AddTaskTodoTable";
import { Task } from "./TodoTable";

type TaskTableProps = {
  tasks: Task[];
  open: boolean;
  onClose: () => void;
  bgColor?: string;
  heading?: string;
  totalTasks?: number;
  loading?: boolean;
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
  taskIds: string[];
};

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  open,
  onClose,
  bgColor,
  heading,
  totalTasks,
  loading,
  setTaskIds,
  taskIds,
}) => {
  const [openEditOption, setOpenEditOption] = useState<string>("");
  const { findByIdAndDelete, findByIdAndUpdate } = useDb();
  const [openStatus, setOpenStatus] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    // Handle other logic (e.g., updating the status of a task)
  };
  const handleCheckboxChange = async (id: string, status: string) => {
    try {
      setTaskIds((prev) =>
        prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
      );
      await findByIdAndUpdate("tasks", id, { status });
    } catch (error) {
      console.log(error);
    }
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

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModal(true);
  };

  return (
    <>
      <div className=" bg-white rounded-xl md:block hidden ">
        <Accordion>
          <Accordion.AccordionSummary onClick={onClose}>
            <div
              className={`flex justify-between items-center w-full p-3 cursor-pointer ${bgColor}`}
              style={{ backgroundColor: bgColor }}
            >
              <h1 className="text-base font-semibold text-black">
                {heading} ({totalTasks})
              </h1>
              <img
                src={downIcon}
                className={`h-9 w-9 ease-in-out transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </Accordion.AccordionSummary>

          <Accordion.AccordionDetails
            open={open}
            className="bg-background-todo-bg"
          >
            <div className="flex flex-col gap-2 justify-center">
              {tasks.some((task) => task.status === "to-do") && (
                <AddTaskTodoTable />
              )}
              {loading && <p className="p-4">Loading tasks...</p>}

              {tasks?.map((item: Task) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center text-[14px] cursor-pointer font-medium h-[48px] title-color border-b border-b-text-dark/10 relative"
                >
                  <div className="flex px-3 col-span-4 custom-font items-center gap-1 p-3">
                    <input
                      type="checkbox"
                      checked={taskIds.includes(item.id)}
                      onChange={() =>
                        handleCheckboxChange(item.id, item.status)
                      }
                    />
                    <img src={dragIcon} alt="Drag" />
                    <img src={checkMark} alt="Checkmark" />

                    <h1 className="custom-font">{item?.title}</h1>
                  </div>
                  <h1 className="col-span-3 custom-font">
                    {formatDate(item?.dueDate)}
                  </h1>
                  <button
                    onClick={() => setOpenStatus(!openStatus)}
                    className="col-span-2 relative  custom-font bg-background-button-color w-fit px-3 py-1.5 rounded uppercase "
                  >
                    {item.status}
                    {openStatus && (
                      <Dropdown
                        handleStatusChange={handleStatusChange}
                        selectedStatus={selectedStatus}
                      />
                    )}
                  </button>
                  <button className="col-span-2 text-start custom-font capitalize  ">
                    {item.category}
                  </button>
                  <div className="col-span-1 flex items-end justify-end px-5 relative">
                    <img
                      src={moreIcon}
                      alt="More"
                      onClick={() => setOpenEditOption(String(item.id))}
                      className="cursor-pointer"
                    />

                    {openEditOption === item.id && (
                      <div className="absolute -left-10 top-3 rounded-xl overflow-hidden  h-[76px] w-[134px] p-2 flex flex-col gap-2 bg-white border-2 border-[#7B19841F] shadow-lg z-10">
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
              ))}
            </div>
          </Accordion.AccordionDetails>
        </Accordion>
        {openEditModal && selectedTask && (
          <EditModal
            openEditModal={openEditModal}
            setEditModal={setEditModal}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </div>
      <div className="block md:hidden ">
        <ResponsiveTable
          tasks={tasks}
          open={open}
          onClose={onClose}
          bgColor={bgColor}
          heading={heading}
          taskIds={taskIds}
          setTaskIds={setTaskIds}
        />
      </div>
    </>
  );
};

const ResponsiveTable: React.FC<TaskTableProps> = ({
  tasks,
  open,
  onClose,
  bgColor,
  heading,
  loading,
  setTaskIds,
  taskIds,
}) => {
  const handleCheckboxChange = (id: string) => {
    setTaskIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className=" bg-white  custom-rounded-2xl">
      <Accordion>
        <Accordion.AccordionSummary onClick={onClose} className="">
          <div
            className={`flex justify-between items-center w-full p-2 cursor-pointer ${bgColor}`}
            style={{ backgroundColor: bgColor }}
          >
            <h1 className="text-base font-semibold text-black">{heading}</h1>
            <img
              src={downIcon}
              className={`h-9 w-9 ease-in-out transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </Accordion.AccordionSummary>

        <Accordion.AccordionDetails
          open={open}
          className="bg-background-todo-bg"
        >
          <div className="flex flex-col gap-2 justify-center">
            {loading && <p className="p-4">Loading tasks...</p>}

            {tasks?.map((item: Task) => (
              <div
                key={item.id}
                className="flex items-center text-[14px] cursor-pointer font-medium title-color border-b border-b-text-dark/10 relative"
              >
                <div className="flex px-3  custom-font items-center gap-1 p-3">
                  <input
                    type="checkbox"
                    checked={taskIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <img src={checkMark} alt="Checkmark" />

                  <h1 className="custom-font">{item?.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </Accordion.AccordionDetails>
      </Accordion>
    </div>
  );
};
export default TaskTable;
