import { collection, onSnapshot, query, where } from "firebase/firestore";
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
  const { category, search } = useTaskFilter();

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    let q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do")
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
    />
  );
};

export default TodoTable;
