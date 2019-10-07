import express from 'express';
import { Request, Response } from "express";
import { verifiAuth } from "../../middleware/authVerifi";
import Project from '../../models/project';

const router = express.Router();

router.get('/api/projects', verifiAuth, async (req: Request, res: Response) => {
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

router.post('/api/projects', verifiAuth, async (req: Request, res: Response) => {
    const project = new Project({name: req.body.name, author: (req as any).user._id});
    try {
        await project.save();
        res.status(200).json({ok: true, res: 'Project created'})
    }catch (e) {
        res.status(404).json({ok: false, res: 'Server error'});
    }
});

export default router;
