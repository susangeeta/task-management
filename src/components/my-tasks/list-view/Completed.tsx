import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../db/db.config";
import useAuth from "../../../hooks/useAuth";
import TaskTable from "./TaskTable";
import { Task } from "./TodoTable";

const Completed = () => {
  const [openCompletePanel, setOpenCompletePanel] = useState(true);
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    const q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "completed")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <TaskTable
      key={2}
      tasks={todos}
      open={openCompletePanel}
      totalTasks={todos.length}
      loading={loading}
      heading="Completed"
      onClose={() => setOpenCompletePanel(!openCompletePanel)}
      bgColor="bg-background-completed-bg"
    />
  );
};

export default Completed;
