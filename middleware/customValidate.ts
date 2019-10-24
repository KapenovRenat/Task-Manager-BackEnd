import { Request, Response } from 'express';

export const validate = (req: Request, res: Response, next: any) => {
    let errors: string[] = [];

    if (!req.body.email || !validEmail(req.body.email)) {
        errors.push('No valid Email');
    }

    if (!req.body.hash) {
        errors.push('Empty Password');
    }

    if (!req.body.name) {
        errors.push('Empty Name');
    }

    (req as any).errors = errors;
    next();
};

export const validateLogin = (req: Request, res: Response, next: any) => {
    let errors: string[] = [];

    if (!req.body.email || !validEmail(req.body.email)) {
        errors.push('No valid Email');
    }

    if (!req.body.hash) {
        errors.push('Empty Password');
    }

    (req as any).errors = errors;
    next();
};

const validEmail = (email: string) => {
    const check = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(email);
};
