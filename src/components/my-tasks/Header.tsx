const MyTasksHeader = () => {
  return (
    <div className="py-5">
      <div className="grid grid-cols-12 items-center border-t  text-[14px] custom-font border-t-gray-200 cursor-pointer text-text-dark font-bold">
        <div className="col-span-4 p-2">Task Name</div>
        <div className="col-span-3 p-2">DueOn</div>
        <div className="col-span-2 p-2">Task Status</div>
        <div className="col-span-2 p-2">Task Category</div>
        <div className="col-span-1 p-2 "></div>
      </div>
    </div>
  );
};

export default MyTasksHeader;
