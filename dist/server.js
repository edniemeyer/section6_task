"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const WebSocket = require("ws");
const http = require("http");
const reader_1 = require("../src/reader");
const PORT = 3000;
//initialize a simple http server
const server = http.createServer(app_1.default);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
let timezoneController = new reader_1.TimezoneController();
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send(timezoneController.readAll());
});
//start our server
server.listen(8999, () => {
    console.log(`Server started on port 8999 :)`);
});
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map