/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { crossIcon } from "../../../assets/svg";
import Modal from "../../../common/Modal";
import useAuth from "../../../hooks/useAuth";
import useDb from "../../../hooks/useDb";

const CreateTaskModal = ({
  openEditModal,
  setEditModal,
  selectedTask,
  setSelectedTask,
}: {
  openEditModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: any;

  setSelectedTask: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { findByIdAndUpdate } = useDb();
  const { user } = useAuth();

  // Initialize state with selectedTask data
  useEffect(() => {
    if (selectedTask) {
      setTaskTitle(selectedTask.title);
      setTaskDescription(selectedTask.description);
      setTaskCategory(selectedTask.category);
      setDueDate(selectedTask.dueDate);
      setTaskStatus(selectedTask.status);
    }
  }, [selectedTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "taskTitle") {
      setTaskTitle(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    } else if (name === "taskCategory") {
      setTaskCategory(value);
    } else if (name === "dueDate") {
      setDueDate(value);
    } else if (name === "taskStatus") {
      setTaskStatus(value);
    }
  };

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
      setLoading(true);
      const updatedTask = await findByIdAndUpdate("tasks", selectedTask.id, {
        category: formData.taskCategory,
        title: formData.taskTitle,
        description: formData.taskDescription,
        status: formData.taskStatus,
        dueDate: formData.dueDate,
        userUid: user.uid,
      });

      if (updatedTask) {
        setSelectedTask(updatedTask);
        Swal.fire({
          title: "Success!",
          text: "Task updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        handleCancel();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the task.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
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

    setEditModal(false);
  };

  const isSubmitDisabled =
    !taskTitle || !taskDescription || !taskCategory || !dueDate || !taskStatus;

  return (
    <Modal
      isOpen={openEditModal}
      onClose={() => setEditModal(false)}
      className="flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xxl overflow-hidden shadow-lg w-[1026px]  md:w-[1026px]  flex justify-between flex-col"
      >
        <div className="border-b-2 border-b-text-dark/10 flex justify-between p-3 md:p-5">
          <h2 className="text-xl font-semibold text-text-custom-gray">
            Edit Task
          </h2>
          <img
            onClick={handleCancel}
            src={crossIcon}
            className=" h-6 w-6 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 h-[30rem]">
            <div className="flex flex-col gap-5 p-5 overflow-y-auto">
              <div>
                <input
                  type="text"
                  name="taskTitle"
                  value={taskTitle}
                  onChange={handleChange}
                  onBlur={() => handleBlur("taskTitle")}
                  className={`w-full p-2.5 px-4 focus:outline-none border border-gray-300 rounded-lg text-text-deep-blue bg-background-light-gray custom-font text-base ${
                    touched.taskTitle && errors.taskTitle
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Task title"
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
                  <p className="text-sm text-red-500">
                    {errors.taskDescription}
                  </p>
                )}
              </div>
              <div className=" pt-14 md:pt-12 flex flex-col  md:grid  md:grid-cols-3 gap-3 md:gap-8">
                <div>
                  <h1 className="text-sm text-text-dark font-semibold custom-font">
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
                    <p className="text-sm text-red-500">
                      {errors.taskCategory}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm custom-font  text-text-dark font-semibold">
                    Due On *
                  </h1>
                  <input
                    type="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={handleChange}
                    onBlur={() => handleBlur("dueDate")}
                    className={`w-full focus:outline-none p-1 custom-font rounded-lg border border-gray-300 placeholder:text-text-dark/20 bg-background-light-gray text-base ${
                      touched.dueDate && errors.dueDate ? "border-red-500" : ""
                    }`}
                  />
                  {touched.dueDate && errors.dueDate && (
                    <p className="text-sm text-red-500">{errors.dueDate}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="task-status"
                    className="text-sm text-text-dark custom-font font-semibold"
                  >
                    Task Status *
                  </label>
                  <select
                    id="task-status"
                    name="task-status"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    onBlur={() => handleBlur("taskStatus")}
                    className={`w-full focus:outline-none text-base text-text-dark
 p-2 rounded-lg border border-gray-300 text-text-deep-blue bg-background-light-gray custom-font  ${
   touched.taskStatus && errors.taskStatus ? "border-red-500" : ""
 }`}
                  >
                    <option value="" disabled className="custom-font">
                      Choose
                    </option>
                    <option value="to-do" className="custom-font">
                      To-Do
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
            </div>
          </div>
          <div className="col-span-5 bg-background-custom-bg flex flex-col ">
            <div className="custom-font text-base font-semibold text-text-custom-text bg-white p-4 border-b border-b-gray-300">
              Activity
            </div>
            <div className="flex flex-col gap-2 text-[10px] text-text-deep-blue font-normal p-4  ">
              <div className="flex justify-between">
                <p className="custom-font">You created this task</p>
                <p>Dec 27 at 1:15 pm</p>
              </div>
              <div className="flex justify-between">
                <p className="custom-font">
                  You changed status from in progress to complete
                </p>
                <p>Dec 27 at 1:15 pm</p>
              </div>
              <div className="flex justify-between">
                <p className="custom-font">You uploaded file</p>
                <p>Dec 27 at 1:15 pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 bg-background-custom-bg border-t-2 border-b-t-gray-800 py-5 px-5 overflow-hidden ">
          <button
            type="button"
            className="bg-white text-text-custom-dark font-bold w-[6.5625rem] h-[2.5rem] flex items-center justify-center border border-text-dark/50 rounded-full"
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
              "Update"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
