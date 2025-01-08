import React, { createContext, useContext, useState } from "react";

type categoryType = "work" | "personal" | "";

type TaskFilterType = {
  category: categoryType;
  dueDate: string;
  search: string;
  setDueDate: (dueDate: string) => void;
  setCategory: (view: categoryType) => void;
  setSearch: (search: string) => void;
};

const TaskFilterContext = createContext<TaskFilterType | undefined>(undefined);

export const TaskFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<categoryType>("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  return (
    <TaskFilterContext.Provider
      value={{ category, setCategory, dueDate, setDueDate, search, setSearch }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export const useTaskFilter = () => {
  const context = useContext(TaskFilterContext);
  if (!context) {
    throw new Error("useView must be used within a TaskFilterProvider");
  }
  return context;
};
