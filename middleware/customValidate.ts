import { Request, Response } from 'express';

export const validate = (req: Request, res: Response, next: any) => {
    let errors: string[] = [];

    if (!req.body.email || !validEmail(req.body.email)) {
        errors.push('No valid Email');
    }

    if (!req.body.hash) {
        errors.push('Emty Password');
    }

    if (!req.body.name) {
        errors.push('Emty Name');
    }

    (req as any).errors = errors;
    next();
};

const validEmail = (email: string) => {
    const check = /^\w+@\w+\.\w{2,4}$/i;
    return check.test(email) ? true : false;
};
