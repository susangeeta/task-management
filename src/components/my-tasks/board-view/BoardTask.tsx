import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BoardCard } from "../..";
import { SearchNotFound } from "../../../assets/svg";
import { useTaskFilter } from "../../../contexts/TaskFilter";
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
  const { category, search } = useTaskFilter();

  //tododata
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

  //inprogress
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

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const progressData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setProgress(progressData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category]);

  //complete
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
      const completeData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setComplete(completeData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category]);

  return (
    <div>
      {todos.length || progress.length || complete.length ? (
        <div className="grid grid-cols-4 gap-6  ">
          <BoardCard
            bgColor="bg-background-todo-color"
            heading="TO-DO"
            tasks={todos}
            loading={loading}
            type="To-Do"
          />
          <BoardCard
            bgColor="bg-background-inprogress-bg"
            heading="In-Progress"
            tasks={progress}
            loading={loading}
            type="In-Progress"
          />{" "}
          <BoardCard
            bgColor="bg-background-completed-bg"
            heading="Completed"
            tasks={complete}
            loading={loading}
            type="Completed"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center w-full py-3 ">
          <img src={SearchNotFound} className="h-80 " />
          <h1 className="custom-font text-[24px] font-bold text-center">
            It looks like we can't find any results <br /> that match.
          </h1>
        </div>
      )}
    </div>
  );
};

export default BoardTask;
