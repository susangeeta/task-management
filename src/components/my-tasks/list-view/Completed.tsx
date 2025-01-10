import {
  collection,
  getDocs,
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

const Completed = ({
  setTaskIds,
  taskIds,
}: {
  taskIds: string[];
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { category, search, dueDate } = useTaskFilter();
  const [openCompletePanel, setOpenCompletePanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "completed"),
      orderBy("dueDate", "asc")
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
      where("status", "==", "completed"),
      orderBy("dueDate", "asc")
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString();
      q = query(q, where("dueDate", "<=", formattedDueDate));
    }

    // if (search) {
    //   q = query(
    //     q,
    //     where("title", ">=", search),
    //     where("title", "<=", search + "\uf8ff")
    //   );
    // }

    const querySnapshot = await getDocs(q);
    const todosData: Task[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));
    const filteredTasks = todosData.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setTodos(filteredTasks);
    setLoading(false);

    setHasMore(false);
  };

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
      handleLoadMore={handleShowMore}
      loadMoreText={hasMore ? "Load More" : ""}
      type={"Completed"}
    />
  );
};

export default Completed;
