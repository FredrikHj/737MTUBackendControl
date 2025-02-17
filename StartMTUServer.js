// Creates a Socket.IO server for Node JS for the controlment for the MTU Unit 
import { Server } from "socket.io";
import InitiateConMtuViwer from'./InitiateConMtuViwer.js';
import PhidgetServerConHandler from"./Functions/Phidgets/ConnectToPhidgetServer.js";

const port = 3001;
const io = new Server(port, {    
    cors: { 
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: false
    }
});   
console.log(`MTU Server is started on port nr: ${port} and waiting for MTU viewer connection!`);
// Request the Phidgets server connection
    console.log("Request connection for Phidgets Server");

    PhidgetServerConHandler(io);
    
    // Initiate connection for MtuViwer
    InitiateConMtuViwer(io);
console.log("-------------------------------------------------------------------------------");