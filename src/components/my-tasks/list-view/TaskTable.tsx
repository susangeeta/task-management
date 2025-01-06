import { useState } from "react";
import {
  checkMark,
  deleteIcon,
  downIcon,
  dragIcon,
  editIcon,
  moreIcon,
} from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";
import { Task } from "./TodoTable";
type TaskTableProps = {
  tasks: Task[];
  open: boolean;
  onClose: () => void;
  bgColor: string;
  heading: string;
  totalTasks: number;
  loading: boolean;
};

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  open,
  onClose,
  bgColor,
  heading,
  totalTasks,
  loading,
}) => {
  const [openEditOption, setOpenEditOption] = useState<string>("");
  const [taskIds, setTaskIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setTaskIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
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
    <div className=" bg-white rounded-xl overflow-hidden">
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
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <img src={dragIcon} alt="Drag" />
                  <img src={checkMark} alt="Checkmark" />

                  <h1 className="custom-font">{item?.title}</h1>
                </div>
                <h1 className="col-span-3 custom-font">
                  {" "}
                  {formatDate(item?.dueDate)}
                </h1>
                <button className="col-span-2 custom-font bg-background-button-color w-fit px-3 py-1.5 rounded uppercase ">
                  {item.status}
                </button>
                <button className="col-span-2 custom-font capitalize  ">
                  {item.category}
                </button>
                <div className="col-span-1 flex items-center relative">
                  <img
                    src={moreIcon}
                    alt="More"
                    onClick={() => setOpenEditOption(String(item.id))}
                    className="cursor-pointer"
                  />

                  {openEditOption === item.id.toString() && (
                    <div className="absolute -left-16 -bottom-[5rem] rounded-xl h-[76px] w-[134px] p-2 flex flex-col gap-2 bg-white border-2 border-[#7B19841F] shadow-lg z-10">
                      <button className="flex px-1 items-center gap-2 text-base font-semibold custom-font text-[#000000] w-full hover:bg-gray-50 rounded transition-colors">
                        <img src={editIcon} alt="Edit" className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex px-1 text-base gap-2 font-semibold items-center custom-font text-[#DA2F2F] w-full hover:bg-gray-50 rounded transition-colors">
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
    </div>
  );
};

export default TaskTable;
