import { useState } from "react";
import { downIcon, plusIcon } from "../../assets/svg";
import Accordion from "../../common/Accoridan";

const Todo = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  // const [addTaskOpen, setAddTaskOpen] = useActionData(false);

  const handleAddTaskToggle = () => {
    setIsAddTaskOpen((prev) => !prev);
  };

  const handleAddTaskClick = () => {
    console.log("Add Task Clicked");
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <Accordion>
        <Accordion.AccordionSummary
          role="button"
          aria-expanded={isAddTaskOpen}
          aria-controls="add-task-details"
          className="flex justify-between items-center w-full p-3 bg-background-todo-color cursor-pointer"
          onClick={handleAddTaskToggle}
        >
          <h1 className="text-base font-semibold text-black">Todo (3)</h1>
          <img
            src={downIcon}
            className={`h-9 w-9 ease-in-out transition-transform duration-200 ${
              isAddTaskOpen ? "rotate-180" : ""
            }`}
          />
        </Accordion.AccordionSummary>
        <Accordion.AccordionDetails
          id="add-task-details"
          open={isAddTaskOpen}
          className="bg-background-todo-bg"
        >
          <div className="h-80 p-3 ">
            <div
              className="flex items-center border-b border-b-text-dark/20 p-1 w-full gap-1 mb-3 cursor-pointer"
              onClick={handleAddTaskClick}
            >
              <img src={plusIcon} className="h-5 w-5" />
              <h1 className="text-text-dark text-base font-bold">Add task</h1>
            </div>
            {/* <AddTaskDropDown /> */}
          </div>

          <div></div>
        </Accordion.AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Todo;
