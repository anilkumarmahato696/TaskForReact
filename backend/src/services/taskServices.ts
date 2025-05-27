export type TaskStatus = "pending" | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

let tasks: Task[] = [];
let nextId = 1;

export const getTasks = () => tasks;

export const createTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: nextId++,
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  return newTask;
};
export const addTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: nextId++,
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  return newTask;
};


export const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

export const updateTaskStatus = (id: number, status: TaskStatus): Task | null => {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;
  task.status = status;
  return task;
};
