import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTaskFilter } from "../../../contexts/TaskFilter";
import { db } from "../../../db/db.config";
import useAuth from "../../../hooks/useAuth";
import TaskTable from "./TaskTable";
import { Task } from "./TodoTable";

const Completed = ({
  setTaskIds,
  taskIds,
}: {
  taskIds: string[];
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [openCompletePanel, setOpenCompletePanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { category, search } = useTaskFilter();
  const [loadMore, setLoadMore] = useState(true);

  const handleLoadMore = () => {
    setLoadMore(!loadMore);
  };

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "completed")
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
      key={3}
      tasks={todos}
      setTaskIds={setTaskIds}
      open={openCompletePanel}
      taskIds={taskIds}
      totalTasks={todos.length}
      loading={loading}
      heading="Completed"
      onClose={() => setOpenCompletePanel(!openCompletePanel)}
      bgColor="bg-background-completed-bg"
      handleLoadMore={handleLoadMore}
      loadMoreText={loadMore ? "Load More" : "Show Less"}
      type={"Completed"}
    />
  );
};

export default Completed;
