import express, { Request, Response } from 'express';
import { createTask, deleteTask, getTasks, updateTaskStatus } from '../services/taskServices';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.json(getTasks());
});

router.post('/', (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields: title and description' });
    }
    const task = createTask(title, description);
    res.status(201).json(task);
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const success = deleteTask(id);
    if (!success) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
});

router.patch('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    if (status !== 'pending' && status !== 'done') {
        return res.status(400).json({ error: 'Invalid status. Must be "pending" or "done"' });
    }
    
    const updatedTask = updateTaskStatus(id, status);
    if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
});

export default router;