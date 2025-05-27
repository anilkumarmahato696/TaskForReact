import { Task } from "../types/task";
import { randomUUID } from "crypto";

let tasks: Task[] = [];
export const getTasks = (): Task[] => tasks;

export const addTask = (data: Omit<Task, "id" | "status">): Task => {
    const newTask: Task = {
        id: randomUUID(),
        ...data,
        status: "pending",
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
};

export const deleteTask = (id: string): boolean => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
};

export const updateTaskStatus = (id: string, status: Task["status"]): Task | null => {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    task.status = status;
    task.updatedAt = new Date().toISOString();
    return task;
};