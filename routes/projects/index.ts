import Message from "../../models/messages-project";
import User from "../../models/user";
import { invitationMailSend } from "../../services/mail-send";
import { USER_STATUS } from '../../configuration';
import express from 'express';
import { Request, Response } from "express";
import { verifiAuth } from '../../middleware/authVerifi';
import Project  from '../../models/project';
import Task from '../../models/task';
import ProjectSubscribe from '../../models/project-subscribe';
const router = express.Router();

router.get('/api/project', verifiAuth, async (req: Request, res: Response) => {
    const { isPrivate } = req.query;
    let projects: any;
    try {
        if (isPrivate) {
            projects = await Project.find({isPrivate})
                .populate('author', 'name');
        } else {
            projects = await Project.find()
                .populate('author', 'name');
        }
        let result: any = [];
        for (let i = 0; i < projects.length; i ++) {
            let subscribes = await ProjectSubscribe.find({project: projects[i]._id});
            const project: any = {
                _id: projects[i]._id,
                name: projects[i].name,
                author: projects[i].author,
                url_avatar: projects[i].url_avatar,
                isPrivate: projects[i].isPrivate,
                subscribes
            };
            result.push(project);
        }
        res.status(200)
            .json({
                ok: true,
                res: result
            });
    } catch (e) {
        res.status(404).json({ok: false, res: 'Server error'});
    }
});

router.get('/api/project/:id', verifiAuth, async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({project_id: req.params.id}).populate('user_id');
        const users_project = await ProjectSubscribe.find({project: req.params.id})
            .populate('user_id', '+project');
        const project = await Project.findById(req.params.id);
        const result = {tasks, users_project, project};
        res.status(200).json({ok: true, res: result});
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server Error'});
    }
});

router.post('/api/project', verifiAuth, async (req: Request, res: Response) => {
    const project = new Project({
        name: req.body.name,
        author: (req as any).user._id,
    });
    const projectSubscribe = new ProjectSubscribe({
        user_id: (req as any).user._id,
        project: project._id
    });
    try {
        await project.save();
        await projectSubscribe.save();
        res.status(200).json({ok: true, res: 'Project created'})
    }catch (e) {
        res.status(500).json({ok: false, res: 'Project expected'});
    }
});

router.delete('/api/project/:id', verifiAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const projectSubscribe = await ProjectSubscribe.find({user_id: (req as any).user._id});
        if ((projectSubscribe as any)[0].user_status === USER_STATUS.ADMIN) {
            const project = await Project.findById(id);
            await Project.findByIdAndDelete((project as any)._id);
            await Task.deleteMany({project_id: (project as any)._id});
            await ProjectSubscribe.deleteMany({project: id});

            res.status(200).json({ok: true, res: 'removed'});
        } else {
            res.status(500).json({ok: false, res: 'We cant remove this project'});
        }
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

router.post('/api/invite/project/:id', verifiAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let project = await Project.find({_id: id});
        let user = await User.find({email: req.body.email});
        invitationMailSend((req as any).user, project, user);
        res.status(200).json({ok: true, res: 'invitation ok!'})
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

router.get('/api/invitation/project/confirm/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let user: any = await User.find({email: req.query.user_id});
        let sub = new ProjectSubscribe({user_id: user[0]._id, user_status: USER_STATUS.DEVELOPER, project: id});
        await sub.save();
        res.status(200).json({ok: true, res: 'Good'})
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

router.get('/api/project/messages/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        let messages: any = await Message.find({project_id: id});
        res.status(200).json({ok: true, res: messages});
    } catch (e) {
        res.status(500).json({ok: false, res: 'Server error'});
    }
});

export default router;
