import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTaskFilter } from "../../../contexts/TaskFilter";
import { db } from "../../../db/db.config";
import useAuth from "../../../hooks/useAuth";
import TaskTable from "./TaskTable";
import { Task } from "./TodoTable";

const InProgress = ({
  setTaskIds,
  taskIds,
}: {
  taskIds: string[];
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [openInProgressPanel, setOpenInProgressPanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { category, search } = useTaskFilter();

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "inprogress")
    );
    if (category) {
      q = query(q, where("category", "==", category));
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));

      const filteredTasks = todosData.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
      setTodos(filteredTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category, search]);

  return (
    <TaskTable
      key={2}
      setTaskIds={setTaskIds}
      taskIds={taskIds}
      tasks={todos}
      loading={loading}
      open={openInProgressPanel}
      totalTasks={todos.length}
      heading="In-Progress"
      onClose={() => setOpenInProgressPanel(!openInProgressPanel)}
      bgColor="bg-background-inprogress-bg"
    />
  );
};

export default InProgress;
