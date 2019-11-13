import Message from "../models/messages-project";
import WebSocketServer from 'ws';

let users: any = {};

let webSocketServer = new WebSocketServer.Server({port: 3000});

webSocketServer.on('connection', function(ws, req) {
    let project = (req as any).url.split('=')[1];

    if (project in users) {
        users[project].push(ws);
    } else {
        users[project] = [];
        users[project].push(ws);
    }

    ws.on('message', function(message: string) {
        let data: any = JSON.parse(message);
        if (data.type === 1) {
            let messageSave = new Message(data);
            messageSave.save().then(res => {
                users[data.project_id].forEach((item: any) => {
                    item.send(message);
                });
            }).catch(e => {
                console.log(e);
            })
        } else {
            users[data.project_id].forEach((item: any) => {
                item.send(message);
            });
        }

    });

    ws.on('close', function() {
        let indexWS = users[project].indexOf(ws);
        users[project].splice(indexWS, indexWS);
    });

});

export default webSocketServer;
