import express from 'express';
import { Request, Response } from 'express';
import User from "../../models/user";
import { verifiAuth } from '../../middleware/authVerifi';

const router = express.Router();

router.get('/api/users', verifiAuth, async (req: Request, res: Response) => {
    try {
        let users = await User.find().select('-hash');
        const response = users.filter(item => String(item._id) !== String((req as any).user._id));
        res.json({ok: true, res: response});
    } catch (e) {
        res.status(400).json({ok: false, res: 'Sorry'})
    }
});


export default router;
