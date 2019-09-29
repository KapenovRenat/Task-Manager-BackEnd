import express from 'express';
import { Request, Response } from 'express';
import { validate } from '../../middleware/customValidate';
import User from '../../models/user';
const router = express.Router();


router.post('/api/registration', validate, async (req: Request, res: Response) => {
    if ((req as any).errors.length > 0) {
        res.status(404).json({ok: false, errors: (req as any).errors});
    } else {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ok: true});
    }
});

export default router;
