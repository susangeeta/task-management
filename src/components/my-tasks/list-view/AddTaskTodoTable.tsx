import { useState } from "react";
import {
  addIcon,
  calenderIcon,
  exportIcon,
  plusIcon,
} from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";

const AddTaskTodoTable = () => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const handelOpen = () => {
    setOpen(!open);
  };
  const handelCategory = () => {
    setOpenCategory(!openCategory);
  };
  const handelStatus = () => {
    setOpenStatus(!openStatus);
  };
  return (
    <Accordion>
      <Accordion.AccordionSummary onClick={handelOpen}>
        <div className="flex gap-1 px-14 py-2.5 border-b border-b-text-dark/10 cursor-pointer">
          <img src={plusIcon} className="" />
          <h1 className="text-[14px] font-bold custom-font  text-text-secondary/80 uppercase">
            Add Task
          </h1>
        </div>
      </Accordion.AccordionSummary>
      <Accordion.AccordionDetails open={open} className="">
        <div className="grid grid-cols-12 p-12 border-b border-b-text-dark/10">
          <div className="col-span-4  px-12 flex flex-col gap-6">
            <input
              type="text"
              className="bg-background-todo-bg placeholder:custom-font placeholder:text-[14px] placeholder:font-semibold  placeholder:text-text-dark/50 focus:outline-none"
              placeholder="Task Title "
            />
            <div className="flex gap-4 items-center">
              <button className="bg-[#7B1984] h-[30px] rounded-xxl w-[84px] gap-1 flex items-center justify-center">
                <span className="text-white text-[14px] custom-font font-bold">
                  ADD
                </span>
                <img src={exportIcon} className="h-5 w-5" />
              </button>
              <h1 className="text-[#000000] text-[14px] custom-font font-bold cursor-pointer">
                CANCEL
              </h1>
            </div>
          </div>
          <div className="col-span-3">
            <button className=" flex gap-1 rounded-xxl border border-text-dark/20 h-[30px] items-center justify-center w-[98px]">
              <img src={calenderIcon} className="h-[18px] w-[18px]" />
              <span className="text-[12px] font-semibold text-text-dark/60 custom-font custom-font">
                Add Date
              </span>
            </button>
          </div>
          <div onClick={handelStatus} className=" relative col-span-2 h-[6rem]">
            <div className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center">
              <img src={addIcon} className="h-4 w-4" />
            </div>
            {openStatus && (
              <div className="absolute top-8 left-6 bg-[#fff9f9]  border border-[#7B198426] rounded-xl shadow-lg  w-[8rem]  ">
                <ul className="text-[12px]  uppercase font-semibold p-3 flex cursor-pointer flex-col gap-3">
                  <li className="custom-font ">To-Do</li>
                  <li className="custom-font">InProgress</li>
                  <li className="custom-font">Completed</li>
                </ul>
              </div>
            )}
          </div>

          <div
            onClick={handelCategory}
            className=" relative col-span-2 h-[6rem]"
          >
            <div className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center">
              <img src={addIcon} className="h-4 w-4" />
            </div>
            {openCategory && (
              <div className="absolute top-8 left-6 bg-[#fff9f9]  border border-[#7B198426] rounded-xl shadow-lg  w-[8rem]  ">
                <ul className="text-[12px]  uppercase font-semibold p-3 flex cursor-pointer flex-col gap-3">
                  <li className="custom-font ">Work</li>
                  <li className="custom-font">Personal</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Accordion.AccordionDetails>
    </Accordion>
  );
};

export default AddTaskTodoTable;
