import express from 'express';
import { Request, Response } from "express";

const router = express.Router();


router.get('/api/projects', (req: Request, res: Response) => {
    res.json({ok: true, msg: 'projects'});
});

export default router;
