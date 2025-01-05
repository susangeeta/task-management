import dynamic from "next/dynamic";
import Modal from "../../common/Modal";

const CreateTaskModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  return (
    <div className="p-5">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center"
      >
        <div className="bg-white p-5 rounded shadow-lg w-[674px] h-[696px]">
          <h2 className="text-xl font-bold mb-4">Create Task</h2>
          <div className="flex flex-col gap-3">
            <div>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-[#1E212A] bg-[#fafafa] text-base"
                placeholder="Task Title"
              />
            </div>
            <div className="w-full rounded-md   text-[#1E212A]  text-base">
              <ReactQuill
                theme="snow"
                className="h-28 rounded-md bg-[#fafafa]"
              />
            </div>
            <div className="pt-10 grid grid-cols-3 gap-8">
              <div>
                <h1 className="text-sm text-text-dark font-semibold">
                  Task Category*
                </h1>
                <div className="flex  pt-3 gap-4">
                  <button className="rounded-full w-24 py-2 font-semibold  text-sm border border-gray-300">
                    Work
                  </button>
                  <button className="rounded-full w-24 py-2 border font-semibold text-sm border-gray-300">
                    Personal
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-sm text-text-dark font-semibold">
                  Due On *
                </h1>
                <input
                  type="date"
                  className="w-full p-1 rounded-lg border border-gray-300  text-[#1E212A] bg-[#fafafa] text-base"
                />
              </div>
              <div className="w-full max-w-sm">
                <label
                  htmlFor="task-status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Status
                </label>
                <select
                  id="task-status"
                  name="task-status"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <label
                htmlFor="file-upload"
                className="block text-base font-semibold text-text-dark"
              >
                Attachment
              </label>
              <div className="flex items-center justify-center w-[630px]">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center h-[45px] w-full rounded-lg border border-gray-300rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="text-sm text-text-dark font-semibold">
                    Drop your files here or{" "}
                    <span className="text-[#2956DD] font-semibold underline">
                      {" "}
                      Update
                    </span>
                  </div>{" "}
                  <input id="file-upload" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* <div className="mt-4 flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={setIsModalOpen}
            >
              Cancel
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
