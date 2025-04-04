const MyTasksHeader = () => {
  return (
    <div className=" hidden md:block pt-10">
      <div className="grid grid-cols-12 items-center border-t  text-xs  border-t-gray-200 cursor-pointer text-text-dark/60 font-bold">
        <div className="col-span-4 custom-font p-2">Workflow Name</div>
        <div className="col-span-3 custom-font p-2 flex gap-1 items-center">
          ID
        </div>
        <div className="col-span-2 custom-font p-2">Last Edited On</div>
        <div className="col-span-2 custom-font p-2">Description</div>
        <div className="col-span-1 custom-font p-2 "></div>
      </div>
    </div>
  );
};

export default MyTasksHeader;
