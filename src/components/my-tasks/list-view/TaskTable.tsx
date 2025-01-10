import { createRef, useRef, useState } from "react";
import Swal from "sweetalert2";
import { EditModal } from "../..";
import {
  checkMark,
  checkMarkGreen,
  deleteIcon,
  downIcon,
  dragIcon,
  editIcon,
  moreIcon,
} from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";
import { default as Popup } from "../../../common/Popup";
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
  handleLoadMore?: () => void;
  loadMoreText?: string;
  type?: string;
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
  handleLoadMore,
  loadMoreText,
  type,
}) => {
  const [openEditOption, setOpenEditOption] = useState<string | null>("");
  const { findByIdAndDelete, findByIdAndUpdate } = useDb();
  const [openStatus, setOpenStatus] = useState("");
  const [openEditModal, setEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const buttonRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

  const statusRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

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
    setOpenEditOption(null);
  };

  const handelStatusUpdate = async (id: string, status: string) => {
    try {
      await findByIdAndUpdate("tasks", id, { status });
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusRef = (id: string) => {
    if (!statusRef.current[id]) {
      statusRef.current[id] = createRef();
    }
    return statusRef.current[id];
  };

  const getButtonRef = (id: string) => {
    if (!buttonRef.current[id]) {
      buttonRef.current[id] = createRef();
    }
    return buttonRef.current[id];
  };

  return (
    <>
      <div className=" bg-white rounded-xl md:block hidden overflow-hidden">
        <Accordion>
          <Accordion.AccordionSummary onClick={onClose}>
            <div
              className={`flex justify-between items-center w-full p-3 ${bgColor}`}
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
              {tasks.length === 0 && !loading && (
                <div className="flex items-center justify-center h-[331px] ">
                  <p className=" text-gray-500 ">No tasks in {type}</p>
                </div>
              )}
              {tasks.some((task) => task.status === "to-do") && (
                <AddTaskTodoTable />
              )}
              {loading && <p className="p-4">Loading tasks...</p>}

              {tasks?.map((item: Task) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12  items-center text-xs  h-[48px] title-color border-b border-b-text-dark/10 relative"
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
                    {item.status !== "completed" ? (
                      <img src={checkMark} alt="Checkmark" />
                    ) : (
                      <img src={checkMarkGreen} alt="Checkmark" />
                    )}

                    <h1 className="custom-font relative w-fit">
                      {item.status === "completed" && (
                        <div className="absolute h-[1px] bg-black w-full top-1/2 left-0 right-0 bottom-1/2"></div>
                      )}
                      {item?.title}
                    </h1>
                  </div>
                  <h1 className="col-span-3 custom-font">
                    {formatDate(item?.dueDate)}
                  </h1>
                  <div className="col-span-2">
                    <button
                      onClick={() =>
                        setOpenStatus((pre) =>
                          pre === String(item.id) ? "" : item.id
                        )
                      }
                      ref={getStatusRef(String(item.id)) as any}
                      className="custom-font bg-background-button-color w-fit px-3 py-1.5 rounded uppercase "
                    >
                      {item.status}
                    </button>
                    <Popup
                      isOpen={openStatus === item.id}
                      onClose={() => setOpenStatus("")}
                      anchorEl={getStatusRef(item.id).current}
                      className="rounded-xl overflow-hidden h-[100px] w-[8rem] flex flex-col gap-2 bg-background-lightPink border-2 border-border-light/15 shadow-lg"
                    >
                      <div
                        className={`text-xxxl flex flex-col  gap-2 p-3 items-start text-black`}
                      >
                        <button
                          onClick={() => handelStatusUpdate(item.id, "to-do")}
                          className={`custom-font uppercase ${
                            item.status === "to-do"
                              ? "font-bold"
                              : "font-semibold "
                          }`}
                        >
                          To-Do
                        </button>
                        <button
                          onClick={() =>
                            handelStatusUpdate(item.id, "inprogress")
                          }
                          className={`custom-font uppercase ${
                            item.status === "inprogress"
                              ? "font-bold"
                              : "font-semibold "
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() =>
                            handelStatusUpdate(item.id, "completed")
                          }
                          className={`custom-font uppercase ${
                            item.status === "completed"
                              ? "font-bold"
                              : "font-semibold "
                          }`}
                        >
                          Completed
                        </button>
                      </div>
                    </Popup>
                  </div>
                  <button className="col-span-2 text-start custom-font capitalize  ">
                    {item.category}
                  </button>
                  <div className="col-span-1 flex items-end justify-end px-5">
                    <img
                      src={moreIcon}
                      alt="More"
                      ref={getButtonRef(String(item.id)) as any}
                      onClick={() =>
                        setOpenEditOption((pre) =>
                          pre === String(item.id) ? "" : item.id
                        )
                      }
                      className="cursor-pointer p-1"
                    />

                    <Popup
                      isOpen={openEditOption === item.id}
                      onClose={() => setOpenEditOption("")}
                      anchorEl={getButtonRef(item.id).current}
                      className="rounded-xl overflow-hidden h-[4.75rem] w-[8.375rem] p-2 flex flex-col gap-2 bg-white border-2 border-border-custom-purple shadow-lg"
                    >
                      <button
                        onClick={() => handleEditTask(item)}
                        className="flex px-1 items-center gap-2 text-base font-semibold custom-font text-black w-full hover:bg-gray-50 rounded transition-colors"
                      >
                        <img src={editIcon} alt="Edit" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(item.id)}
                        className="flex px-1 text-base gap-2 font-semibold items-center custom-font text-text-custom-red w-full hover:bg-gray-50 rounded transition-colors"
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="h-4 w-4"
                        />
                        <span>Delete</span>
                      </button>
                    </Popup>
                  </div>
                </div>
              ))}
              {tasks.length > 0 && (
                <button
                  onClick={handleLoadMore}
                  className="hover:underline custom-font font-semibold text-text-custom-blue text-center  py-2"
                >
                  {loadMoreText}
                </button>
              )}
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
          totalTasks={totalTasks}
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
  totalTasks,
  taskIds,
}) => {
  const handleCheckboxChange = (id: string) => {
    setTaskIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className=" bg-white  custom-rounded-2xl overflow-hidden px-3">
      <Accordion>
        <Accordion.AccordionSummary onClick={onClose} className="">
          <div
            className={`flex justify-between items-center w-full p-2 ${bgColor}`}
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
            {loading && <p className="p-4">Loading tasks...</p>}

            {tasks?.map((item: Task) => (
              <div
                key={item.id}
                className="flex items-center text-xs cursor-pointer font-medium title-color border-b border-b-text-dark/10 relative"
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
