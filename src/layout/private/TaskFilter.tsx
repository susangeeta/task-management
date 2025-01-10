import { useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { crossIcon, down, searchIcon } from "../../assets/svg";
import Popup from "../../common/Popup";
import { CreateTaskModal } from "../../components";
import { useTaskFilter } from "../../contexts/TaskFilter";

const TaskFilter = () => {
  const { category, setCategory, search, setSearch, setDueDate, dueDate } =
    useTaskFilter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const datePickerRef = useRef<HTMLButtonElement & HTMLDivElement>(null);
  const handleCategorySelect = (category: "work" | "personal") => {
    setCategory(category);
    setIsCategoryOpen(false);
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
    <div className="flex justify-between w-full">
      <div className="flex gap-3 items-center">
        <h1 className="text-xxxl font-semibold custom-font text-text-secondary/60">
          Filter by :
        </h1>
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="border border-text-secondary/20 h-[35px] w-[100px] items-center justify-center gap-1.5 rounded-xxl flex"
          >
            <span className="text-xxxl font-semibold custom-font capitalize text-text-secondary/60">
              {category || "Category"}
            </span>
            <img src={down} alt="dropdown-icon" />
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full mt-1 left-0 bg-background-lightPink border border-border-light rounded-xl shadow-lg w-full z-10">
              <ul className="text-xxxl uppercase font-semibold p-3 flex cursor-pointer flex-col gap-3">
                <li
                  onClick={() => handleCategorySelect("work")}
                  className="custom-font"
                >
                  Work
                </li>
                <li
                  onClick={() => handleCategorySelect("personal")}
                  className="custom-font"
                >
                  Personal
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setShowDatePicker(!showDatePicker);
            }}
            ref={datePickerRef}
            className="border border-text-secondary/20 h-[35px] w-[100px] items-center justify-center gap-1.5 rounded-xxl flex"
          >
            <span className="text-xxxl font-semibold custom-font text-text-secondary/60">
              {dueDate ? formatDate(dueDate) : "Due Date"}
            </span>
            <img src={down} alt="dropdown-icon" />
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
                    setDueDate(new Date(String(date)).toISOString());
                    setShowDatePicker(false);
                  }}
                  value={dueDate}
                  className="react-calendar"
                />
              </div>
            </Popup>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="relative border border-text-secondary/40 rounded-xxl w-full overflow-hidden h-[36px]">
          <img src={searchIcon} className="absolute left-3 top-2.5" />
          <input
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className=" pl-9 w-full h-full outline-none placeholder:text-xxxl font-semibold custom-font placeholder:text-black"
            placeholder="Search"
          />
          {search && (
            <div className="h-full w-10 bg-white absolute right-0 top-0 bottom-0 flex items-center justify-center">
              <img
                onClick={() => setSearch("")}
                src={crossIcon}
                className=" bg-white right-4 top-3 h-4 w-4 cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="flex w-fit">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-text-primary text-white w-[9.5rem] h-[3rem] rounded-[41px]"
          >
            Add Task
          </button>
        </div>
      </div>
      <CreateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TaskFilter;
