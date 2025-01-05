import { addIcon, calenderIcon, union } from "../../assets/svg";

const AddTaskDropDown = () => {
  return (
    <div className="grid grid-cols-6 items-center text-black   border-t border-t-gray-200 cursor-pointer">
      <div>
        <div className="px-6 col-span-2">
          <input
            type="text"
            className="bg-background-todo-bg text-[14px] text-text-dark font-medium border border-transparent focus:outline-none focus:border-transparent focus:ring-0 p-2 rounded"
            placeholder="Task Title "
          />
        </div>

        <div className="px-8 flex gap-5 items-center">
          <button className="bg-text-primary flex items-center gap-2 text-white rounded-xxl h-[30px] w-[84px] px-6">
            <span className="text-[14px] font-semibold">Add</span>
            <img src={union} className="" />
          </button>
          <h2 className="text-[14px] font-semibold">CANCEL</h2>
        </div>
      </div>

      <button className="rounded-xxl border w-32 col-span-2 border-text-dark/20">
        <img src={calenderIcon} />
        <span className="text-text-dark/20 font-semibold">Add Date</span>
      </button>

      <div className="col-span-1 p-2   h-[30px] w-[30px] flex items-center rounded-full border border-text-dark">
        <img src={addIcon} className=" !h-20 !w-20" />
      </div>
      <div className="col-span-1 p-2   h-[30px] w-[30px] flex items-center rounded-full border border-text-dark">
        <img src={addIcon} className=" !h-20 !w-20" />
      </div>
    </div>
  );
};

export default AddTaskDropDown;
