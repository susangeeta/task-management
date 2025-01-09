import { createRef, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { addIcon, exportIcon, plusIcon } from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";
import Popup from "../../../common/Popup";

const AddTaskTodoTable = () => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [inputType, setInputType] = useState<"text" | "date">("text");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const statusRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const categoryRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    {}
  );

  const toggleStatusPopup = (id: string) => {
    setOpenStatus((prev) => (prev === id ? null : id));
  };
  const toggleCategoryPopup = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };
  const getStatusRef = (id: string) => {
    if (!statusRef.current[id]) {
      statusRef.current[id] = createRef();
    }
    return statusRef.current[id];
  };

  const getCategoryRef = (id: string) => {
    if (!categoryRef.current[id]) {
      categoryRef.current[id] = createRef();
    }
    return categoryRef.current[id];
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <Accordion>
      <Accordion.AccordionSummary onClick={() => setOpen(!open)}>
        <div className="flex gap-1 px-14 py-2.5 border-b border-b-text-dark/10 cursor-pointer">
          <img src={plusIcon} className="" />
          <h1 className="text-xs font-bold custom-font  text-text-secondary/80 uppercase">
            Add Task
          </h1>
        </div>
      </Accordion.AccordionSummary>
      <Accordion.AccordionDetails open={open} className="">
        <div className=" border-b border-b-text-dark/10 flex flex-col  gap-5 p-4 ">
          <div className="grid grid-cols-12 h-[30px] ">
            <div className="col-span-4  px-12 flex flex-col gap-6">
              <input
                type="text"
                className="bg-background-todo-bg placeholder:custom-font placeholder:text-xs placeholder:font-semibold  placeholder:text-text-dark/50 focus:outline-none"
                placeholder="Task Title "
              />
            </div>
            <div className="col-span-3 ">
              <input
                type={inputType}
                className={`w-32 focus:outline-none p-1 custom-font rounded-lg border border-gray-300 placeholder:text-text-dark/20 placeholder:text-sm bg-background-light-gray text-base`}
                placeholder="Add Date"
                onFocus={() => setInputType("date")} // Switch to date picker on focus
                onBlur={() => setInputType("text")} // Switch back to text on blur
              />
            </div>
            {/* <div className="col-span-3 relative">
              <button
                onClick={() => setShowDatePicker((prev) => !prev)}
                className="flex gap-1 rounded-xxl border border-text-dark/20 h-[30px] items-center justify-center w-[98px]"
              >
                <img src={calenderIcon} className="h-[18px] w-[18px]" />
                <span className="text-xxxl font-semibold text-text-dark/60 custom-font">
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Add Date"}
                </span>
              </button>
              {showDatePicker && (
                <div
                  ref={datePickerRef}
                  className="absolute  top-12 left-0  border border-text-dark/20 rounded-xl bg-white shadow-lg"
                >
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="react-calendar"
                  />
                </div>
              )}
            </div> */}
            <div
              ref={getStatusRef("status")}
              onClick={() => toggleStatusPopup("status")}
              className=""
            >
              <div className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center">
                <img src={addIcon} className="h-4 w-4" />
              </div>
              <Popup
                isOpen={openStatus === "status"}
                onClose={() => setOpenStatus(null)}
                anchorEl={getStatusRef("status").current}
                className="rounded-xl  h-[100px] w-[8rem] flex flex-col gap-2 bg-background-lightPink border-2 border-border-light/15 shadow-lg"
              >
                <div
                  className={`text-xxxl flex flex-col  gap-2 p-3 items-start  text-[#000000]`}
                >
                  <button>To-Do</button>
                  <button>In Progress</button>
                  <button>Completed</button>
                </div>
              </Popup>
            </div>

            <div
              ref={getCategoryRef("category")}
              onClick={() => toggleCategoryPopup("category")}
              className="col-spa "
            >
              <div className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center">
                <img src={addIcon} className="h-4 w-4" />
              </div>
              <Popup
                isOpen={openCategory === "category"}
                onClose={() => setOpenCategory(null)}
                anchorEl={getCategoryRef("category").current}
                className="rounded-xl  h-[80px] w-[6rem] flex flex-col gap-2 bg-background-lightPink border-2 border-border-light/15 shadow-lg"
              >
                <div
                  className={`text-xxxl flex flex-col  gap-2 p-3 items-start  text-[#000000]`}
                >
                  <button>Work</button>
                  <button>Professional</button>
                </div>
              </Popup>
            </div>
          </div>

          <div className="flex gap-4 items-center px-12">
            <button className="bg-[#7B1984] h-[30px] rounded-xxl w-[84px] gap-1 flex items-center justify-center">
              <span className="text-white text-xs custom-font font-bold">
                ADD
              </span>
              <img src={exportIcon} className="h-5 w-5" />
            </button>
            <h1 className="text-[#000000] text-xs custom-font font-bold cursor-pointer">
              CANCEL
            </h1>
          </div>
        </div>
      </Accordion.AccordionDetails>
    </Accordion>
  );
};

export default AddTaskTodoTable;
