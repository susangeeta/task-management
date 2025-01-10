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

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
}

const TodoTable = ({
  setTaskIds,
  taskIds,
}: {
  taskIds: string[];
  setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [openTodoPanel, setOpenTodoPanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { category, search, dueDate } = useTaskFilter();
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do"),
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

      if (todosData.length > 8) {
        setTodos(todosData.slice(0, 8));
        setHasMore(true);
      } else {
        setTodos(todosData);
        setHasMore(false);
      }

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
      where("status", "==", "to-do"),
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
  console.log(todos);

  return (
    <TaskTable
      key={1}
      tasks={todos}
      open={openTodoPanel}
      totalTasks={todos.length}
      loading={loading}
      taskIds={taskIds}
      setTaskIds={setTaskIds}
      heading="Todo"
      onClose={() => setOpenTodoPanel(!openTodoPanel)}
      bgColor="bg-background-todo-color"
      handleLoadMore={handleShowMore}
      loadMoreText={hasMore ? "Load More" : ""}
      type={"To-Do"}
    />
  );
};

export default TodoTable;
