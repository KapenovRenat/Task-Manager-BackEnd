import express from 'express';
import { Request, Response } from "express";
import { verifiAuth } from "../../middleware/authVerifi";

const router = express.Router();

router.get('/api/projects', verifiAuth, (req: Request, res: Response) => {
    res.json({ok: true, msg: 'projects'});
});

export default router;
