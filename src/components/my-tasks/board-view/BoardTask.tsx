import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
  const { category, search, dueDate } = useTaskFilter();

  //tododata
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

  //inprogress
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

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const progressData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      const filteredTasks = progressData.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
      setProgress(filteredTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category, search, dueDate]);

  //complete
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
      const completeData: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      const filteredTasks = completeData.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
      setComplete(filteredTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid, category, search, dueDate]);

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
