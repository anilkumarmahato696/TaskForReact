import { Task } from "../types";
import useTasks from "../hooks/useTask";

export default function TaskItem({ task }: { task: Task }) {
    const { deleteTask, updateTaskStatus } = useTasks();

    return (
        <li>
            <strong>{task.title}</strong> - {task.description} [{task.status}]
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => updateTaskStatus(task.id, task.status)}>
                Toggle Status
            </button>
        </li>
    );
}