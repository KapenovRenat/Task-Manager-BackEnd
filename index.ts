import express from 'express';
import TaskRouter from './routes/task';
import ProjectsRouter from './routes/projects';
import AuthRouter from './routes/authorization';
import MainRouter from './routes/main';
import UsersRouter from './routes/users';
import Config from './configuration';
import db from './database';
import bodyParser from 'body-parser';
import cors from 'cors';
import webSocketServer from './websocket';

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(ProjectsRouter);
server.use(AuthRouter);
server.use(TaskRouter);
server.use(MainRouter);
server.use(UsersRouter);
server.listen(Config.PORT, () => {
    db;
    console.log('server started');
    webSocketServer;
});
