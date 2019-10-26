import express from 'express';
import { Request, Response } from 'express';
import { verifiAuth } from '../../middleware/authVerifi';
import Project  from '../../models/project';
import Task from '../../models/task';

const router = express.Router();

router.get('/api/main', verifiAuth, async (req: Request, res: Response) => {
    try {
        let projects = await Project.find({author: (req as any).user._id});
        let tasks = await Task.find({user_id: (req as any).user._id});
        const result = {
            projects,
            tasks
        }
        res.status(200).json({ok: true, res: result});
    } catch (e) {
        res.status(400).json({ok: false, res: 'Sorry!'});
    }
});

export default router;
