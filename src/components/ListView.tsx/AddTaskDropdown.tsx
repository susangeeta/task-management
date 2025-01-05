import { union } from "../../assets/svg";

const AddTaskDropDown = () => {
  return (
    <div className="flex flex-col">
      <div>
        <div className="px-6">
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
      <div>
        <button className="rounded-xxl border border-text-dark/20">
          <img src="" />
          <span className="text-text-dark/20 font-semibold">Add Date</span>
        </button>
      </div>
    </div>
  );
};

export default AddTaskDropDown;
