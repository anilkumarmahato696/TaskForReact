import { useState } from 'react';
import TaskList from './components/TaskItems';
import { useTasks } from './hooks/useTask';
import { TaskStatus } from './types';

function App() {
    const { tasks, isLoading, error, deleteTask, updateTaskStatus } = useTasks();
    const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

    const filteredTasks = statusFilter === 'all'
        ? tasks
        : tasks.filter(task => task.status === statusFilter);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="task-manager">
            <header>
                <h1>Task Manager</h1>
            </header>
            <div className="task-actions">
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <TaskList
                tasks={filteredTasks}
                onDelete={deleteTask}
                onStatusChange={updateTaskStatus}
            />
            {filteredTasks.length === 0 && (
                <div className="empty-state">
                    No tasks found{statusFilter !== 'all' && ` with status ${statusFilter}`}.
                </div>
            )}
        </div>
    );
}

export default App;