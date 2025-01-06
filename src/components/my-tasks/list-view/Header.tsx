import { sortIcon } from "../../../assets/svg";

const MyTasksHeader = () => {
  return (
    <div className="py-5">
      <div className="grid grid-cols-12 items-center border-t  text-[14px]  border-t-gray-200 cursor-pointer text-text-dark/60 font-bold">
        <div className="col-span-4 custom-font p-2">Task Name</div>
        <div className="col-span-3 custom-font p-2 flex gap-1 items-center">
          DueOn
          <div className="pt-1">
            <img src={sortIcon} className="h-2 w-2" />
          </div>
        </div>
        <div className="col-span-2 custom-font p-2">Task Status</div>
        <div className="col-span-2 custom-font p-2">Task Category</div>
        <div className="col-span-1custom-font p-2 "></div>
      </div>
    </div>
  );
};

export default MyTasksHeader;
