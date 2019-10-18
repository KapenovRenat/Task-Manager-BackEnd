import nodemailer from "nodemailer";
import config from '../../configuration';
interface IUser {
    _id: string;
    name: string;
    email: string;
    hash: string;
    isTrue: boolean;
}

export async function mailSend(user: IUser) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.MAIL.email,
            pass: config.MAIL.password
        }
    });
    try {
        return await transporter.sendMail({
            from: 'managergroup1995@mail.ru <managergroup1995@mail.ru>',
            to: `${user.email}`,
            subject: 'Confirm Registration',
            html: `
                <h2>Hello</h2>
                <h3>Confirm pls your email!</h3>
                <a href="http://localhost:4000/api/registration/${user._id}" target="_blank">Confirm</a>
            `
        });
    } catch (e) {
        console.error(e);
    }
}
