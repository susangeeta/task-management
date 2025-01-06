import { useState } from "react";
import { crossIcon, down, searchIcon } from "../../assets/svg";
import CreateTaskModal from "../../components/ListView.tsx/CreateTaskModal";

const TaskFilter = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-3 items-center">
        <h1 className="text-[12px] font-semibold custom-font text-text-secondary/60">
          Filter by :
        </h1>
        <div className="relative">
          <button
            onClick={handleCategoryClick}
            className="border border-text-secondary/20 h-[35px] w-[100px] items-center justify-center gap-1.5 rounded-xxl flex"
          >
            <span className="text-[12px] font-semibold custom-font text-text-secondary/60">
              {selectedCategory}
            </span>
            <img src={down} alt="dropdown-icon" />
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full mt-1 left-0  bg-[#fff9f9] border border-[#7B198426] rounded-xl shadow-lg w-full z-10">
              <ul className=" text-[12px] uppercase font-semibold p-3 flex cursor-pointer flex-col gap-3">
                <li
                  onClick={() => handleCategorySelect("Work")}
                  className=" custom-font"
                >
                  Work
                </li>
                <li
                  onClick={() => handleCategorySelect("Personal")}
                  className="custom-font"
                >
                  Personal
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <button className="border border-text-secondary/20 h-[35px] w-[100px] items-center justify-center gap-1.5 rounded-xxl flex">
            <span className="text-[12px] font-semibold custom-font text-text-secondary/60">
              Due Date
            </span>
            <img src={down} alt="dropdown-icon" />
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative ">
          <img src={searchIcon} className="absolute left-3   top-2.5" />
          <input
            type="text"
            className="border border-text-secondary/40 pl-9 w-[204px] placeholder:text-[12px] font-semibold custom-font placeholder:text-black  rounded-xxl h-[36px] "
            placeholder="Search"
          />
          <img src={crossIcon} className="absolute right-4 top-3 h-4 w-4" />
        </div>
        <div className="flex items-end justify-end w-full">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-text-primary text-white w-[152px] h-[48px] rounded-[41px]"
          >
            AddTask
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
