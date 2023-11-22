const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    //creat ws obj
    const wss = new WebSocketServer({ noServer: true });

    //handle protocol upgrade from http 2 ws
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {  //this listens for a connection then makes a connection and adds it to array
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        ws.on('message', function message(data) {
            console.log("sending message");
            connections.forEach((c) => {
                if (c.id !== connection.id) {   //if it's not you then send it to everyone else
                    c.ws.send(data);
                }
            });
        });

        ws.on('close', () => {
            connections.findIndex((o, i) => {
                if (o.id === connection.id) {
                    connections.splice(i, 1);
                    return true;
                }
            });
        });

        //respond to pong message by marking it alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    //keep active conn. alive
    setInterval(() => {
        connections.forEach((c) => {
            //kill if no response to ping
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });

    }, 10000);

}

module.exports = { peerProxy };