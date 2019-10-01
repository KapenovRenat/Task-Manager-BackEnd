import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user";

export const verifiAuth = async (req: Request, res: Response, next: any) => {
    try {
        const decoded = await jwt.verify((req.headers.authorization as string).split(' ')[1], 'manager');
        const user = await User.findOne({_id: (decoded as any).data._id});
        if (user) {
            (req as any).user = (decoded as any).data;
        } else {
            res.status(401).json({ok: false, msg: 'No authorization'});
        }
        next();
    } catch (e) {
        res.json({ok: false, msg: 'token expared'});
    }
};
