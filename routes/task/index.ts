import express from 'express';
import { Request, Response } from 'express';
import { verifiAuth } from '../../middleware/authVerifi';
import Task from '../../models/task';

const router = express.Router();

router.post('/api/project/:id/task', verifiAuth, async (req: Request, res: Response) => {
    const query = new Task({
        name: req.body.name,
        project_id: req.params.id,
        user_id: (req as any).user._id
    });
    try {
        await query.save();
        res.status(200)
            .json({ok: true, res: 'Task Created'});
    } catch (e) {
        res.status(500)
            .json({ok: false, res: 'Server Error'});
    }
});

router.get('/api/project/:id/tasks', verifiAuth, async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({project_id: req.params.id}).populate('user_id')
            .populate('');
        res.status(200)
            .json({ok: true, res: tasks});
    } catch (e) {
        res.status(500)
            .json({ok: false, res: 'Server Error'});
    }
});

router.put('/api/project/task/:id',  verifiAuth, async (req: Request, res: Response)=> {
    const { status_id } = req.body;
    try {
        await Task.findByIdAndUpdate(req.params.id, { status_id });
        res.status(200).json({ok: true, res: 'Updated'});
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server Error'});
    }
});

router.delete('/api/project/task/:id', verifiAuth, async (req: Request, res: Response)=> {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ok: true, res: 'Task Deleted'});
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server Error'});
    }
});

export default router;
