import express from 'express';
import { Request, Response } from 'express';
import { validate, validateLogin } from '../../middleware/customValidate';
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

router.post('/api/login', validateLogin, async (req: Request, res: Response) => {
    if ((req as any).errors.length > 0) {
        res.status(404).json({ok: false, errors: (req as any).errors});
    } else {
        const result = await User.findOne({email: req.body.email});
        if (result ? (result as any).checkPassword(req.body.hash) : false) {
            res.status(200).json({ok: true, suc_token: await (result as any).generateToken()})
        } else {
            res.status(404).json({ok: false})
        }
    }
});

export default router;
