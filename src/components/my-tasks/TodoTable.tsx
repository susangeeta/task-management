import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../db/db.config";
import useAuth from "../../hooks/useAuth";
import TaskTable from "./TaskTable";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
}

const TodoTable = () => {
  const [openTodoPanel, setOpenTodoPanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    const q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "to-do")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <TaskTable
      key={1}
      tasks={todos}
      open={openTodoPanel}
      totalTasks={todos.length}
      heading="Todo"
      onClose={() => setOpenTodoPanel(!openTodoPanel)}
      bgColor="bg-background-todo-color"
    />
  );
};

export default TodoTable;
