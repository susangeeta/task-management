/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReactQuill from "react-quill";
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
      const response = await create("tasks", {
        category: formData.taskCategory,
        title: formData.taskTitle,
        description: formData.taskDescription,
        status: formData.taskStatus,
        dueDate: formData.dueDate,
        userUid: user.uid,
      });
      console.log(response);
      handleCancel();
    } catch (error) {
      console.log(error);
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
        className="bg-white rounded-[20px] overflow-hidden shadow-lg w-[357px]  md:w-[680px] h-[696px] flex justify-between flex-col"
      >
        <div>
          <div className="border-b-2 border-b-text-dark/10 flex justify-between p-3 md:p-5">
            <h2 className="text-xl font-semibold text-[#2F2F2F]">
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
                className={`w-full p-2.5 px-4 focus:outline-none border border-gray-300 rounded-lg text-[#1E212A] bg-[#fafafa] custom-font text-base ${
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
            <div className="w-full focus:outline-none rounded-lg text-[#1E212A] text-base">
              <ReactQuill
                theme="snow"
                className={`h-28 bg-[#fafafa] custom-font  ${
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
                  className={`w-full focus:outline-none p-1 custom-font  rounded-lg border border-gray-300  placeholder:text-text-dark/20  bg-[#fafafa] text-base ${
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
                  className={`w-full focus:outline-none p-2 rounded-lg border border-gray-300 text-[#1E212A] bg-[#fafafa] text-base focus:border-blue-500 focus:ring-blue-500 ${
                    touched.taskStatus && errors.taskStatus
                      ? "border-red-500"
                      : ""
                  }`}
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  onBlur={() => handleBlur("taskStatus")}
                >
                  <option
                    value=""
                    disabled
                    className="text-base text-text-dark"
                  >
                    Choose
                  </option>
                  <option value="to-do" className="text-base text-text-dark">
                    To Do
                  </option>
                  <option
                    value="inprogress"
                    className="text-base text-text-dark"
                  >
                    In Progress
                  </option>
                  <option
                    value="completed"
                    className="text-base text-text-dark"
                  >
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
              <div className="flex items-center justify-center  md:w-[630px] pt-2">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center h-[45px] w-full rounded-lg border border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
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
        <div className="flex justify-end gap-2 bg-text-dark/20 border-b  border-b-gray-400 py-5 px-5 ">
          <button
            type="button"
            className="bg-white text-[#090909] font-bold w-[105px] h-[40px] flex items-center justify-center border border-text-dark/50 rounded-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-text-primary/50 text-white font-bold w-[105px] h-[40px] flex items-center justify-center border border-text-dark/50 rounded-full"
            disabled={isSubmitDisabled}
          >
            CREATE
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
