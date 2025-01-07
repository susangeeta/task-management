import { useNavigate } from "react-router-dom";
import { mobilebg } from "../assets/common";
import { circle, loginBackground, taskIcon } from "../assets/svg";
import useDb from "../hooks/useDb";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useDb();

  return (
    <div>
      {/* main screen */}
      <div className=" hidden md:flex items-center justify-center bg-background-primary h-screen overflow-hidden">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="col-span-5 ml-28 flex flex-col gap-7 justify-center">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <img src={taskIcon} className="h-[2.046rem] w-[2.046rem]" />
                <h1 className="text-text-primary font-bold text-2xl font">
                  TaskBuddy
                </h1>
              </div>
              <p className="text-sm font-medium text-text-secondary px-2">
                Streamline your workflow and track progress effortlessly <br />
                with our all-in-one task management app.
              </p>
            </div>
            <button
              onClick={async () => {
                await signInWithGoogle();
                navigate("/my-tasks");
              }}
              className="bg-background-secondary h-[3.728rem] w-[22.733rem] text-lg font-bold rounded-2xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <img src="/google.png" alt="Google Icon" className="h-6 w-6" />
              <span className="text-white">Continue With Google</span>
            </button>
          </div>

          <div className="col-span-7 flex relative h-full items-center justify-end">
            <div className="absolute inset-0 flex items-center justify-end pt-5 z-0">
              <img src={circle} alt="circle" className="w-full h-full" />
            </div>
            <div className="z-20 w-full h-full flex items-center justify-end">
              <img
                src={loginBackground}
                alt="login-background"
                className="w-5/6 h-[662px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsikve Screen*/}

      <div className="flex flex-col gap-7 relative items-center justify-center h-screen">
        <div className="absolute inset-0 flex items-center jc   ">
          <img src={mobilebg} alt="circle" className="w-full h-full" />
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-1">
            <img
              src={taskIcon}
              className="h-[2.046rem] w-[2.046rem]"
              alt="Task Icon"
            />
            <h1 className="text-text-primary font-bold text-2xl custom-responsive-font">
              TaskBuddy
            </h1>
          </div>
          <p className="text-sm font-medium text-text-secondary custom-responsive-font px-4">
            Streamline your workflow and track progress effortlessly <br />
            with our all-in-one task management app.
          </p>
        </div>

        <button
          onClick={async () => {
            await signInWithGoogle();
            navigate("/my-tasks");
          }}
          className="bg-background-secondary h-[48px] w-[259px] text-[16px] font-bold rounded-2xl flex items-center justify-center gap-3 cursor-pointer"
        >
          <img src="/google.png" alt="Google Icon" className="h-5 w-5" />
          <span className="text-white custom-responsive-font">
            Continue With Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
