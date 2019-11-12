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

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

    });

    ws.on('close', function() {
        let indexWS = users[project].indexOf(ws);
        users[project].splice(indexWS, indexWS);
    });

});

export default webSocketServer;
