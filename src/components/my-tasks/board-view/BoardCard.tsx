import { moreIcon } from "../../../assets/svg";
import { Task } from "../list-view/TodoTable";

type BoardTaskProps = {
  tasks: Task[];
  bgColor: string;
  heading: string;
  loading: boolean;
};

const BoardTask: React.FC<BoardTaskProps> = ({
  tasks,
  bgColor,
  heading,
  loading,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}   ${month},${year}`;
  };
  return (
    <div className="bg-background-todo-bg h-[40rem] overflow-y-auto overflow-hidden rounded-xl border border-[#58575112]">
      <div className="p-3">
        <button
          className={`text-[14px] custom-font font-medium text-black px-3 py-1 w-fit rounded ${bgColor}`}
        >
          {heading}
        </button>
      </div>

      <div className="flex items-center p-3 flex-col  gap-5 ">
        {loading && <p className="p-4">Loading tasks...</p>}
        {tasks?.map((item: Task) => (
          <div
            key={item.id}
            className="bg-white w-full  flex flex-col justify-between p-3 rounded-xl  border border-text-dark/20"
          >
            <div className="flex flex-col justify-between h-24 gap-2 ">
              <div className="flex justify-between items-center">
                <h1 className="text-[16px] custom-font font-bold text-black ">
                  {item.title}
                </h1>
                <img src={moreIcon} alt="Options" className="cursor-pointer" />
              </div>
              <div className="flex justify-between text-sm ">
                <span className="capitalize text-sm font-semibold text-text-dark/50 custom-font">
                  {item.status}
                </span>
                <span className="capitalize text-sm font-semibold text-text-dark/50 custom-font">
                  {formatDate(item?.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardTask;
