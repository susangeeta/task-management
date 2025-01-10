import { useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { crossIcon } from "../../../assets/svg";
import Modal from "../../../common/Modal";
import useAuth from "../../../hooks/useAuth";
import useDb from "../../../hooks/useDb";

const CreateTaskModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { create } = useDb();
  const { user } = useAuth();

  const [errors, setErrors] = useState({
    taskTitle: "",
    taskDescription: "",
    taskCategory: "",
    dueDate: "",
    taskStatus: "",
  });

  const [touched, setTouched] = useState({
    taskTitle: false,
    taskDescription: false,
    taskCategory: false,
    dueDate: false,
    taskStatus: false,
  });

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      taskTitle: "",
      taskDescription: "",
      taskCategory: "",
      dueDate: "",
      taskStatus: "",
    });

    let hasError = false;
    const newErrors: any = {};

    if (!taskTitle) {
      newErrors.taskTitle = "Task Title is required.";
      hasError = true;
    }
    if (!taskDescription) {
      newErrors.taskDescription = "Task Description is required.";
      hasError = true;
    }
    if (!taskCategory) {
      newErrors.taskCategory = "Task Category is required.";
      hasError = true;
    }
    if (!dueDate) {
      newErrors.dueDate = "Due Date is required.";
      hasError = true;
    }
    if (!taskStatus) {
      newErrors.taskStatus = "Task Status is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const formData = {
      taskTitle,
      taskDescription,
      taskCategory,
      dueDate,
      taskStatus,
      file,
    };

    try {
      setLoading(true);
      const response = await create("tasks", {
        category: formData.taskCategory,
        title: formData.taskTitle,
        description: formData.taskDescription,
        status: formData.taskStatus,
        dueDate: formData.dueDate,
        userUid: user.uid,
      });
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Task Created",
        text: "Your task has been created successfully.",
      });

      handleCancel();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the task. Please try again.",
      });
    } finally {
      setLoading(false);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskCategory("");
    setDueDate("");
    setTaskStatus("");
    setFile(null);

    setTouched({
      taskTitle: false,
      taskDescription: false,
      taskCategory: false,
      dueDate: false,
      taskStatus: false,
    });

    setErrors({
      taskTitle: "",
      taskDescription: "",
      taskCategory: "",
      dueDate: "",
      taskStatus: "",
    });

    setIsModalOpen(false);
  };

  const isSubmitDisabled =
    !taskTitle || !taskDescription || !taskCategory || !dueDate || !taskStatus;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xxl overflow-hidden shadow-lg w-[22.3125rem] md:w-[42.5rem] h-[43.5rem] flex justify-between flex-col"
      >
        <div>
          <div className="border-b-2 border-b-text-dark/10 flex justify-between p-3 md:p-5">
            <h2 className="text-xl font-semibold text-text-custom-gray">
              Create Task
            </h2>
            <img
              onClick={handleCancel}
              src={crossIcon}
              className="h-[24px] w-[24px] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-5 p-5">
            <div>
              <input
                type="text"
                className={`w-full p-2.5 px-4 focus:outline-none border border-gray-300 rounded-lg text-text-deep-blue bg-background-light-gray custom-font text-base ${
                  touched.taskTitle && errors.taskTitle ? "border-red-500" : ""
                }`}
                placeholder="Task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onBlur={() => handleBlur("taskTitle")}
              />
              {touched.taskTitle && errors.taskTitle && (
                <p className="text-sm text-red-500">{errors.taskTitle}</p>
              )}
            </div>
            <div className="w-full focus:outline-none rounded-lg text-text-deep-blue text-base">
              <ReactQuill
                theme="snow"
                className={`h-28 bg-background-light-gray custom-font  ${
                  touched.taskDescription && errors.taskDescription
                    ? "border-red-500"
                    : ""
                }`}
                value={taskDescription}
                onChange={setTaskDescription}
                onBlur={() => handleBlur("taskDescription")}
              />
              {touched.taskDescription && errors.taskDescription && (
                <p className="text-sm text-red-500">{errors.taskDescription}</p>
              )}
            </div>
            <div className=" pt-14 md:pt-12 flex flex-col  md:grid  md:grid-cols-3 gap-3 md:gap-8">
              <div>
                <h1 className="text-sm text-text-dark font-semibold custom-font   ">
                  Task Category*
                </h1>
                <div className="flex pt-3 gap-4">
                  <button
                    type="button"
                    className={`rounded-full custom-font  w-24 py-2 font-semibold text-sm border border-gray-300 ${
                      taskCategory === "work" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setTaskCategory("work")}
                  >
                    Work
                  </button>
                  <button
                    type="button"
                    className={`rounded-full custom-font  w-24 py-2 border font-semibold text-sm border-gray-300 ${
                      taskCategory === "personal" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setTaskCategory("personal")}
                  >
                    Personal
                  </button>
                </div>
                {touched.taskCategory && errors.taskCategory && (
                  <p className="text-sm text-red-500">{errors.taskCategory}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm custom-font  text-text-dark font-semibold">
                  Due On *
                </h1>
                <input
                  type="date"
                  className={`w-full focus:outline-none p-1 custom-font  rounded-lg border border-gray-300  placeholder:text-text-dark/20  bg-background-light-gray text-base ${
                    touched.dueDate && errors.dueDate ? "border-red-500" : ""
                  }`}
                  value={dueDate}
                  placeholder="Dikuhiu"
                  onChange={(e) => setDueDate(e.target.value)}
                  onBlur={() => handleBlur("dueDate")}
                />
                {touched.dueDate && errors.dueDate && (
                  <p className="text-sm text-red-500">{errors.dueDate}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="task-status"
                  className="text-sm text-text-dark custom-font  font-semibold"
                >
                  Task Status *
                </label>
                <select
                  id="task-status"
                  name="task-status"
                  className={`w-full focus:outline-none p-2 rounded-lg border border-gray-300 text-text-deep-blue bg-background-light-gray  text-text-dark text-base focus:border-blue-500 focus:ring-blue-500 ${
                    touched.taskStatus && errors.taskStatus
                      ? "border-red-500"
                      : ""
                  }`}
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  onBlur={() => handleBlur("taskStatus")}
                >
                  <option value="" disabled className="custom-font">
                    Choose
                  </option>
                  <option value="to-do" className="custom-font">
                    To Do
                  </option>
                  <option value="inprogress" className="custom-font">
                    In Progress
                  </option>
                  <option value="completed" className="custom-font">
                    Completed
                  </option>
                </select>
                {touched.taskStatus && errors.taskStatus && (
                  <p className="text-sm text-red-500">{errors.taskStatus}</p>
                )}
              </div>
            </div>
            <div className="w-full md:pt-3">
              <label
                htmlFor="file-upload"
                className="block custom-font  text-base font-semibold text-text-dark"
              >
                Attachment
              </label>
              <div className="flex items-center justify-center  md:w-[39.375rem] pt-2">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center h-[2.8125rem] w-full rounded-lg border border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="text-sm text-text-dark font-semibold">
                    Drop your files here or{" "}
                    <span className="text-[#2956DD] font-semibold underline">
                      Update
                    </span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 bg-text-dark/20 border-b  border-b-gray-400 md:py-5 md:px-5">
          <button
            type="button"
            className="bg-white text-text-custom-dark font-bold w-[105px] h-[40px] flex items-center justify-center border border-text-dark/50 rounded-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-text-primary/50 text-white font-bold w-[6.5625rem] h-[2.5rem] flex items-center justify-center border border-text-dark/50 rounded-full ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            {loading ? (
              <div className="spinner-border animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
            ) : (
              "CREATE"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
