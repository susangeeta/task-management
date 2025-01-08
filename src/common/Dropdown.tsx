interface DropDownProps {
  handleStatusChange: (status: string) => void;
  selectedStatus: string;
}

const Dropdown: React.FC<DropDownProps> = ({ handleStatusChange }) => {
  return (
    <div className="absolute left-0  w-[100px] mt-2 z-[999] rounded-md shadow-lg bg-white  focus:outline-none">
      <div className="py-1">
        <button
          onClick={() => handleStatusChange("to-do")}
          className="text-gray-700 block px-4 py-1 text-sm hover:bg-gray-100"
          role="menuitem"
        >
          To-Do
        </button>
        <button
          onClick={() => handleStatusChange("inprogress")}
          className="text-gray-700 block px-4 py-1 text-sm hover:bg-gray-100"
          role="menuitem"
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange("Completed")}
          className="text-gray-700 block px-4 py-1 text-sm hover:bg-gray-100"
          role="menuitem"
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
