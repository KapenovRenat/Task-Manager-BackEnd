import nodemailer from 'nodemailer';
import config from '../../configuration';
interface IUser {
    _id: string;
    name: string;
    email: string;
    hash: string;
    isActivate: boolean;
}

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: config.MAIL.email,
        pass: config.MAIL.password
    }
});

export async function mailSend(user: IUser) {
    try {
        return await transporter.sendMail({
            from: 'managergroup1995@mail.ru <managergroup1995@mail.ru>',
            to: `${user.email}`,
            subject: 'Confirm Registration',
            html: `
                <h2>Hello</h2>
                <h3>Confirm pls your email!</h3>
                <a href='http://localhost:4000/api/registration/${user._id}' target='_blank'>Confirm</a>
            `
        });
    } catch (e) {
        console.error(e);
    }
}

export async function invitationMailSend(userFrom: any, project: any, userTo: any) {
    try {
        return await transporter.sendMail({
            from: 'managergroup1995@mail.ru <managergroup1995@mail.ru>',
            to: `${userTo[0].email}`,
            subject: 'invitation in Project',
            html: `
                <h2>Hello</h2>
                <h3>You invitation in project: ${project[0].name} from ${userFrom.name}</h3>
                <a href='http://localhost:4000/api/invitation/project/confirm/${project[0]._id}?user_id=${userTo[0].email}' target='_blank'>Go Project</a>
            `
        });
    } catch (e) {
        console.error(e);
    }
}
