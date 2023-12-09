const { WebSocketServer } = require('ws');
const uuid = require('uuid');

// CREATE AND UPGRADE...
function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // TRACK CONNECTIONS...
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // FORWARD...
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        c.ws.send(data);
      });
    });

    // CLOSE...
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // PONG...
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // PING AND TERMINATE...
  setInterval(() => {
    connections.forEach((c) => {
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