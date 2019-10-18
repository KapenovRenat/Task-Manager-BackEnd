import express from 'express';
import { Request, Response } from 'express';
import { mailSend } from "../../services/mail-send";
import { validate, validateLogin } from '../../middleware/customValidate';
import User from '../../models/user';
const router = express.Router();


router.post('/api/registration', validate, async (req: Request, res: Response) => {
    if ((req as any).errors.length > 0) {
        res.status(500).json({ok: false, errors: (req as any).errors});
    } else {
        try {
            const user = new User(req.body);
            const newUser = await user.save();
            await mailSend((newUser as any));
            res.status(200).json({ok: true, res: 'User created, pls confirm you email!'});
        } catch (e) {
            res.status(400).json({ok: false, res: 'Sorry, Server Error'})
        }
    }
});

router.get('/api/registration/:id', async (req: Request, res: Response) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {isTrue: true});
        res.redirect('/');
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/api/login', validateLogin, async (req: Request, res: Response) => {
    if ((req as any).errors.length > 0) {
        res.status(500).json({ok: false, errors: (req as any).errors});
    } else {
        const result = await User.findOne({email: req.body.email});
        if (result ? (result as any).checkPassword(req.body.hash) : false) {
            res.status(200).json({ok: true, suc_token: await (result as any).createToken()})
        } else {
            res.status(500).json({ok: false})
        }
    }
});

export default router;
