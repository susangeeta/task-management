import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultImage } from "../../assets/common";
import { boardIcon, listIcon, logoutIcon, tasksIcon } from "../../assets/svg";
import CreateTaskModal from "../../components/ListView.tsx/CreateTaskModal";
import { useView } from "../../contexts/ViewContext";
import useAuth from "../../hooks/useAuth";
import useDb from "../../hooks/useDb";

const Header = () => {
  const { activeView, setActiveView } = useView();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useDb();
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 pt-[26px] flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={tasksIcon} className="h-8 w-8" />
          <h1 className="text-xxl text-dark">TaskBuddy</h1>
        </div>

        <div className="flex gap-2 items-center">
          <img
            src={user?.avatar || defaultImage}
            className="h-10 w-10 object-cover rounded-full"
          />
          <h1 className="text-base font-bold text-text-dark">{user?.name}</h1>
        </div>
      </div>

      <section className="flex justify-between">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveView("list")}
            className={`flex items-center w-fit gap-1 relative`}
          >
            <div
              className={` ${
                activeView === "list"
                  ? "h-[2px] bg-black w-full absolute top-full"
                  : "hidden"
              }`}
            ></div>
            <img src={listIcon} className="h-4 w-4" />
            <span className="text-text-tertiary text-base font-semibold">
              List
            </span>
          </button>
          <button
            onClick={() => setActiveView("board")}
            className={`flex items-center gap-1 relative`}
          >
            <div
              className={` ${
                activeView === "board"
                  ? "h-[2px] bg-black w-full absolute top-full"
                  : "hidden"
              }`}
            ></div>
            <img src={boardIcon} className="h-4 w-4" />
            <span className="text-text-tertiary text-base font-semibold">
              Board
            </span>
          </button>
        </div>

        <button
          onClick={async () => {
            await logout();
            navigate("/");
          }}
          className="bg-background-logout-color  gap-2 flex items-center rounded-xl px-2 h-[40px] w-[112px]  border border-text-primary/15"
        >
          <img src={logoutIcon} className="h-[15px] w-[15px]" />
          <span className="text-base font-semibold">LogOut</span>
        </button>
      </section>

      <div className="flex items-end justify-end w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-text-primary text-white w-[152px] h-[48px] rounded-[41px]"
        >
          AddTask
        </button>
      </div>
      <CreateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Header;
