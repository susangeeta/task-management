export interface Task {
  id: number;
  title: string;
  data: string;
  taskStatus: string;
  taskCategory: string;
}

export interface TaskTableType {
  tasks: any;
  open: boolean;
  onClose: () => void;
  bgColor: string;
  heading: string;
  totalTasks: number;
}
