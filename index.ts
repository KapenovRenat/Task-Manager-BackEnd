import express from 'express';
import TaskRouter from "./routes/task";
import ProjectsRouter from "./routes/projects";
import AuthRouter from "./routes/authorization";
import Config from './configuration';
import db from './database';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(ProjectsRouter);
server.use(AuthRouter);
server.use(TaskRouter);
server.listen(Config.PORT, () => {
    db;
    console.log('server started');
});
