import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BoardCard } from "../..";
import { db } from "../../../db/db.config";
import useAuth from "../../../hooks/useAuth";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
}

const BoardTask = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [progress, setProgress] = useState<Task[]>([]);
  const [complete, setComplete] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  //tododata
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  //inprogress
  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    const q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "inprogress")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const progressData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setProgress(progressData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  //complete
  useEffect(() => {
    if (!user.uid) return;

    const collectionRef = collection(db, "tasks");
    const q = query(
      collectionRef,
      where("userUid", "==", user.uid),
      where("status", "==", "completed")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const completeData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setComplete(completeData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="grid grid-cols-4 gap-6 ">
      <BoardCard
        bgColor="bg-background-todo-color"
        heading="TO-DO"
        tasks={todos}
        loading={loading}
      />
      <BoardCard
        bgColor="bg-background-inprogress-bg"
        heading="In-Progress"
        tasks={progress}
        loading={loading}
      />{" "}
      <BoardCard
        bgColor="bg-background-completed-bg"
        heading="Completed"
        tasks={complete}
        loading={loading}
      />
    </div>
  );
};

export default BoardTask;
