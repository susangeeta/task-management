const ListViewHeadder = () => {
  return (
    <div className="custom-container">
      <div className="grid grid-cols-6 items-center text-black   border cursor-pointer">
        <div className="col-span-2 p-2 text-sm  font-medium">TaskName</div>

        <div className="col-span-2 p-2 flex items-center justify-center">
          DueOn
        </div>

        <div className="col-span-1 p-2 flex items-center justify-center">
          Task Status
        </div>
        <div className="col-span-1 p-2 flex items-center justify-center ">
          Task Categoery
        </div>
      </div>
    </div>
  );
};

export default ListViewHeadder;
