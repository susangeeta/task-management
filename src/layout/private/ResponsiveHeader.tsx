import { useRef, useState } from "react";
import Calendar from "react-calendar";
import { defaultImage } from "../../assets/common";
import { crossIcon, down, searchIcon } from "../../assets/svg";
import Popup from "../../common/Popup";
import { CreateTaskModal } from "../../components";
import { useTaskFilter } from "../../contexts/TaskFilter";
import useAuth from "../../hooks/useAuth";

const ResponsiveHeader = () => {
  const { category, setCategory, search, setSearch, setDueDate, dueDate } =
    useTaskFilter();
  const { user } = useAuth();
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
    <div className="md:hidden flex flex-col gap-3">
      <div className=" flex justify-between items-center bg-text-custom-light-pink w-full p-4 shadow-md ">
        <h1 className="text-base text-text-custom-gray font-semibold">
          TaskBuddy
        </h1>

        <div className="flex gap-2 items-center">
          <img
            src={user?.avatar || defaultImage}
            className="h-8 w-8 object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex items-end p-3 justify-end w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center  bg-text-primary text-white w-[7.5rem] h-[2.5rem] rounded-xxxl"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col gap-1 px-3">
        <h1 className="text-xxxl font-semibold custom-font text-text-secondary/60">
          Filter by :
        </h1>
        <div className="flex gap-3">
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
              className="absolute  top-12 left-0  border border-text-dark/20 rounded-xl bg-white "
            >
              <Popup
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                anchorEl={anchorEl}
                className="rounded-xl h-[300px] ex flex-col  bg-white  w-[15rem]"
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
      </div>
      <div className="px-2">
        <div className="relative border border-text-secondary/40 rounded-xxl  overflow-hidden h-[36px]  w-80">
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
      </div>
      <CreateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ResponsiveHeader;
