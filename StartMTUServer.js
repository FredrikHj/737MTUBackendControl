// Creates a Socket.IO server for Node JS for the controlment for the MTU Unit 
import { Server } from "socket.io";
import ApiToBeSend from"./API/ApiToSend.js";
import InitiateConMtuViwer from'./InitiateConMtuViwer.js';
import PhidgetServerConHandler from"./Functions/Phidgets/ConnectToPhidgetServer.js";

var serverAddress = ApiToBeSend.MTUConParts.backend["serverAddress"];
var serverPort = ApiToBeSend.MTUConParts.backend["port"];

const io = new Server(serverPort, {    
    cors: { 
        origin: `http://${serverAddress}:${serverPort-1}`,
        methods: ["GET", "POST"],
        credentials: false
    }
});   
console.log(`MTU Server is started on port nr: ${serverPort} and waiting for MTU viewer connection!`);
// Request the Phidgets server connection
    console.log("Request connection for Phidgets Server");

    PhidgetServerConHandler(io);
    
    // Initiate connection for MtuViwer
    InitiateConMtuViwer(io);
console.log("-------------------------------------------------------------------------------");