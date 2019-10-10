import express from 'express';
import { Request, Response } from "express";
import { verifiAuth } from "../../middleware/authVerifi";
import Project  from "../../models/project";
import Task from '../../models/task';
const router = express.Router();

router.get('/api/project', verifiAuth, async (req: Request, res: Response) => {
    const { skip } = req.query;
    try {
        res.status(200)
            .json({
                ok: true,
                res: await Project.find()
                    .populate('author', 'name')
                    .skip(Number(skip))
                    .limit(5)
            });
    } catch (e) {
        res.status(404).json({ok: false, res: 'Server error'});
    }
});

router.post('/api/project', verifiAuth, async (req: Request, res: Response) => {
    const project = new Project({
        name: req.body.name,
        author: (req as any).user._id,
        hash: req.body.hash
    });
    try {
        await project.save();
        res.status(200).json({ok: true, res: 'Project created'})
    }catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

router.delete('/api/project/:id', verifiAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        await Project.findByIdAndDelete((project as any)._id);
        await Task.deleteMany({project_id: (project as any)._id});
        res.status(200).json({ok: false, res: 'removed'});
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

export default router;
