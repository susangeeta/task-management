import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTaskFilter } from "../../../contexts/TaskFilter";
import { db } from "../../../db/db.config";
import useAuth from "../../../hooks/useAuth";
import TaskTable from "./TaskTable";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
}

const InProgress = ({
  setTaskIds,
  taskIds,
}: {
  taskIds: string[];
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [openInProgressPanel, setOpenInProgressPanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<any>(null); // Track the last document
  const [hasMore, setHasMore] = useState(false); // Check if more tasks are available
  const { user } = useAuth();
  const { category, search, dueDate } = useTaskFilter();

  useEffect(() => {
    if (!user.uid) return;

    setLoading(true);

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "inprogress"),
      orderBy("dueDate", "asc"),
      limit(8)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString();
      q = query(q, where("dueDate", "<=", formattedDueDate));
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
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 8);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category, search, dueDate]);

  const handleShowMore = async () => {
    if (!lastVisible) return;
    setLoading(true);

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do"),
      orderBy("dueDate", "asc"),
      startAfter(lastVisible),
      limit(8)
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
    const filteredTasks = todosData.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

    setTodos((prevTodos) => [...prevTodos, ...filteredTasks]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setHasMore(querySnapshot.docs.length === 8);
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
