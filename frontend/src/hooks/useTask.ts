import { useEffect, useState, useCallback } from "react";
import { Task, TaskStatus } from "../types";

const API_BASE = "http://localhost:3000/tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data: Task[] = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          status: "pending" as TaskStatus,
          createdAt: new Date().toISOString()
        }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask: Task = await res.json();
      setTasks(prev => [...prev, newTask]);
      setError(null);
      return newTask;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add task';
      setError(message);
      throw new Error(message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { 
        method: "DELETE" 
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(prev => prev.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw new Error(message);
    }
  };

  const updateTaskStatus = async (id: string, currentStatus: TaskStatus) => {
    const newStatus: TaskStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: newStatus,
          updatedAt: new Date().toISOString() 
        }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask: Task = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      setError(null);
      return updatedTask;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { 
    tasks, 
    isLoading, 
    error,
    addTask, 
    deleteTask, 
    updateTaskStatus,
    refetch: fetchTasks
  };
}