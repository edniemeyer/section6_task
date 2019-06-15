import app from "./app";
import * as WebSocket from 'ws';
import * as http from 'http';
import { TimezoneController } from "../src/reader";

const PORT = 3000;

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let timezoneController = new TimezoneController();

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

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

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})