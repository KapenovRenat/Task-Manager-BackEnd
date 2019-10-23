import express from 'express';
import { Request, Response } from 'express';
import { verifiAuth } from "../../middleware/authVerifi";
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
            mailSend((newUser as any));
            res.status(200).json({ok: true, res: 'User created, pls confirm you email!'});
        } catch (e) {
            res.status(400).json({ok: false, res: 'User exists'})
        }
    }
});

router.get('/api/registration/:id', async (req: Request, res: Response) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {isActivate: true});
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


router.get('/api/user', verifiAuth, async (req: Request, res: Response) => {
    try {
        const result = await User.findById((req as any).user._id);
        res.status(200).json({ok: true, res: result});
    } catch (e) {
        console.log(e);
        res.status(400).json({ok: false, res: 'Server error'});
    }
});

export default router;
