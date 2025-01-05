import { useState } from "react";
import { downIcon, plusIcon } from "../../assets/svg";
import AddTaskDropDown from "./AddTaskDropdown";

const Todo = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleAddTaskToggle = () => {
    setIsAddTaskOpen((prev) => !prev);
  };
  return (
    <div className="bg-white rounded-xl overflow-hidden ">
      <div className="flex justify-between items-center w-full p-3 bg-background-todo-color">
        <h1 className="text-base font-semibold text-black">Todo(3)</h1>
        <img
          onClick={handleAddTaskToggle}
          src={downIcon}
          className="h-9 w-9 cursor-pointer ease-in-out transition-all duration-"
        />
      </div>
      {!isAddTaskOpen && (
        <div className="bg-background-todo-bg h-80">
          <div className="flex items-center p-3 gap-1">
            <img src={plusIcon} className="h-5 w-5" />
            <h1 className="text-text-dark cursor-pointer text-base font-bold">
              Add task
            </h1>
          </div>
          <div className="">
            <AddTaskDropDown />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
