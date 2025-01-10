import { createRef, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import {
  addIcon,
  calenderIcon,
  exportIcon,
  plusIcon,
} from "../../../assets/svg";
import Accordion from "../../../common/Accoridan";
import Popup from "../../../common/Popup";
import useAuth from "../../../hooks/useAuth";
import useDb from "../../../hooks/useDb";

const AddTaskTodoTable = () => {
  const { create } = useDb();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const statusRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const datePickerRef = useRef<HTMLButtonElement & HTMLDivElement>(null);
  const categoryRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    {}
  );

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

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    setOpenStatus(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setOpenCategory(null);
  };

  const isAddButtonActive =
    title && selectedCategory && selectedDate && selectedStatus;

  const handleAddTask = async () => {
    setLoading(true);

    try {
      const response = await create("tasks", {
        status: selectedStatus,
        title: title,
        category: selectedCategory,
        dueDate: new Date(String(selectedDate)).toISOString(),
        userUid: user.uid,
      });
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Task Added",
        text: "Your task has been successfully added!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      handleClear();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding your task. Please try again.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedDate(null);
    setSelectedStatus("");
    setOpen(false);
    setTitle("");
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="bg-background-todo-bg placeholder:custom-font placeholder:text-xs placeholder:font-semibold  placeholder:text-text-dark/50 focus:outline-none"
                placeholder="Task Title "
              />
            </div>

            <div className="col-span-3 relative">
              <button
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setShowDatePicker(!showDatePicker);
                }}
                ref={datePickerRef}
                className="flex gap-1 rounded-xxl border border-text-dark/20 h-[30px] items-center justify-center w-[98px]"
              >
                <img src={calenderIcon} className="h-[18px] w-[18px]" />
                <span className="text-[12px] font-semibold text-text-dark/60 custom-font">
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Add Date"}
                </span>
              </button>
              <div
                ref={datePickerRef}
                className="absolute  top-12 left-0  border border-text-dark/20 rounded-xl bg-white shadow-lg"
              >
                <Popup
                  isOpen={showDatePicker}
                  onClose={() => setShowDatePicker(false)}
                  anchorEl={anchorEl}
                  className="rounded-xl h-[300px] w-[350px] flex flex-col gap-2 bg-white shadow-lg"
                >
                  <div className="p-2">
                    <Calendar
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                      value={selectedDate}
                      className="react-calendar"
                    />
                  </div>
                </Popup>
              </div>
            </div>
            <div className="col-span-2">
              <div className=" ">
                {selectedStatus ? (
                  <span
                    ref={getStatusRef("status")}
                    onClick={() =>
                      setOpenStatus((prev) =>
                        prev === "status" ? null : "status"
                      )
                    }
                    className="border px-3 py-2 rounded-xl w-fit text-base capitalize custom-font font-semibold border-text-dark/20 "
                  >
                    {selectedStatus}
                  </span>
                ) : (
                  <div
                    ref={getStatusRef("status")}
                    onClick={() =>
                      setOpenStatus((prev) =>
                        prev === "status" ? null : "status"
                      )
                    }
                    className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center"
                  >
                    <img src={addIcon} className="h-4 w-4" />
                  </div>
                )}
              </div>
              <Popup
                isOpen={openStatus === "status"}
                onClose={() => setOpenStatus(null)}
                anchorEl={getStatusRef("status").current}
                className="rounded-xl  h-[100px] w-[8rem] flex flex-col items-start gap-2 bg-background-lightPink border-2 border-border-light/15 shadow-lg"
              >
                <div
                  className={`text-[12px] flex flex-col font-semibold  gap-2 p-3   text-black`}
                >
                  <button
                    onClick={() => handleStatusClick("to-do")}
                    className="custom-font w-full text-start uppercase"
                  >
                    To-Do
                  </button>
                  <button
                    onClick={() => handleStatusClick("inprogress")}
                    className="custom-font w-full  text-start uppercase"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusClick("completed")}
                    className="custom-font w-full text-start uppercase"
                  >
                    Completed
                  </button>
                </div>
              </Popup>
            </div>

            <div className="col-span-2 ">
              {selectedCategory ? (
                <span
                  ref={getCategoryRef("category")}
                  onClick={() =>
                    setOpenCategory((prev) =>
                      prev === "category" ? null : "category"
                    )
                  }
                  className="border px-3 py-2 rounded-xl w-fit text-base capitalize custom-font font-semibold border-text-dark/20 "
                >
                  {selectedCategory}
                </span>
              ) : (
                <div
                  ref={getCategoryRef("category")}
                  onClick={() =>
                    setOpenCategory((prev) =>
                      prev === "category" ? null : "category"
                    )
                  }
                  className="  cursor-pointer  border z-[999] border-text-dark/20 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <img src={addIcon} className="h-4 w-4" />
                </div>
              )}
              <Popup
                isOpen={openCategory === "category"}
                onClose={() => setOpenCategory(null)}
                anchorEl={getCategoryRef("category").current}
                className="rounded-xl  h-[80px] w-[6rem] flex flex-col gap-2 bg-background-lightPink border-2 border-border-light/15 shadow-lg"
              >
                <div
                  className={`text-[12px] flex flex-col  gap-2 p-3   text-black font-semibold`}
                >
                  <button
                    onClick={() => handleCategoryClick("work")}
                    className="custom-font w-full text-start uppercase"
                  >
                    Work
                  </button>
                  <button
                    onClick={() => handleCategoryClick("personal")}
                    className="custom-font w-full text-start uppercase"
                  >
                    Personal
                  </button>
                </div>
              </Popup>
            </div>
          </div>

          <div className="flex gap-4 items-center px-12">
            <button
              disabled={!isAddButtonActive || loading}
              onClick={handleAddTask}
            >
              {loading ? (
                <button className="text-white text-xs custom-font font-bold px-3 py-2 w-fit bg-[#7B1984] rounded-xxl">
                  Loading...
                </button>
              ) : (
                <button className=" h-[30px] rounded-xxl w-[84px] gap-1 flex items-center justify-center bg-[#7B1984]">
                  <span className="text-white text-xs custom-font font-bold">
                    ADD
                  </span>
                  <img src={exportIcon} className="h-5 w-5" />
                </button>
              )}
            </button>
            <h1
              onClick={handleClear}
              className="text-[#000000] text-xs custom-font font-bold cursor-pointer"
            >
              CANCEL
            </h1>
          </div>
        </div>
      </Accordion.AccordionDetails>
    </Accordion>
  );
};

export default AddTaskTodoTable;
