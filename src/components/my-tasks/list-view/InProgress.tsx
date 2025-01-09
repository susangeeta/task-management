import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
      where("status", "==", "inprogress")
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (loadMore) {
      q = query(q, limit(1));
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
  }, [user.uid, category, search, loadMore]);

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
      handleLoadMore={handleLoadMore}
      loadMoreText={loadMore ? "Load More" : "Show Less"}
      type={"InProgress"}
    />
  );
};

export default InProgress;
