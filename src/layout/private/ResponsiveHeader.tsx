import { useState } from "react";
import { defaultImage } from "../../assets/common";
import { crossIcon, down, searchIcon } from "../../assets/svg";
import { CreateTaskModal } from "../../components";
import useAuth from "../../hooks/useAuth";

const ResponsiveHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const { user } = useAuth();

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="md:hidden flex flex-col gap-3">
      <div className=" flex justify-between items-center bg-[#FAEEFC] w-full p-4 shadow-md ">
        <h1 className="text-[16px]  text-[#2F2F2F] font-semibold">TaskBuddy</h1>

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
          className="flex items-center justify-center  bg-text-primary text-white w-[120px] h-[40px] rounded-[41px]"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col gap-1 px-5 ">
        <h1 className="text-[12px] font-semibold custom-font text-text-secondary/60">
          Filter by :
        </h1>
        <div className="flex gap-3">
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
              <div className="absolute top-full mt-1 left-0 bg-[#fff9f9] border border-[#7B198426] rounded-xl shadow-lg w-full z-10">
                <ul className="text-[12px] uppercase font-semibold p-3 flex cursor-pointer flex-col gap-3">
                  <li
                    onClick={() => handleCategorySelect("Work")}
                    className="custom-font"
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
          <div className="">
            <button className="border border-text-secondary/20 h-[35px] w-[100px] items-center justify-center gap-1.5 rounded-xxl flex">
              <span className="text-[12px] font-semibold custom-font text-text-secondary/60">
                Due Date
              </span>
              <img src={down} alt="dropdown-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative px-5 pt-2">
        <img
          src={searchIcon}
          className="absolute left-7 top-5 flex items-center justify-center"
        />
        <input
          type="text"
          className="border border-text-secondary/40 pl-7 w-full placeholder:text-[12px] font-semibold custom-font placeholder:text-black rounded-xxl h-[36px]"
          placeholder="Search"
        />
        <img src={crossIcon} className="absolute right-7 top-5 h-4 w-4" />
      </div>
      <CreateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ResponsiveHeader;
