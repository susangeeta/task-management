import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
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
  const { category, search, dueDate } = useTaskFilter();
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "inprogress"),
      orderBy("dueDate", "asc")
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString();
      q = query(q, where("dueDate", "<=", formattedDueDate));
    }
    q = query(q, limit(9));

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
  }, [user.uid, category, search, dueDate]);

  const handleShowMore = async () => {
    setLoading(true);

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "inprogress"),
      orderBy("dueDate", "asc")
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString();
      q = query(q, where("dueDate", "<=", formattedDueDate));
    }

    const querySnapshot = await getDocs(q);
    const todosData: Task[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));

    setTodos(todosData);
    setHasMore(false);
    setLoading(false);
  };

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
      handleLoadMore={handleShowMore}
      loadMoreText={hasMore ? "Load More" : ""}
      type={"InProgress"}
    />
  );
};

export default InProgress;
