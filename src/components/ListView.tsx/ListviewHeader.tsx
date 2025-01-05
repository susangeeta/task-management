import Todo from "./Todo";

const ListViewHeadder = () => {
  return (
    <div className="py-5">
      <div className="grid grid-cols-6 items-center text-black   border-t border-t-gray-200 cursor-pointer">
        <div className="col-span-2 p-2  text-[14px] text-text-dark font-bold ">
          Task Name
        </div>

        <div className="col-span-2 p-2 text-[14px] text-text-dark font-bold">
          DueOn
        </div>

        <div className="col-span-1 p-2  text-[14px] text-text-dark font-bold">
          Task Status
        </div>
        <div className="col-span-1 p-2  text-[14px] text-text-dark font-bold">
          Task Categoery
        </div>
      </div>
      <div className="pt-2">
        <Todo />
      </div>
    </div>
  );
};

export default ListViewHeadder;
