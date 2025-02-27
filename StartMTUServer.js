// Creates a Socket.IO server for Node JS for the controlment for the MTU Unit 
import { Server } from "socket.io";
import MtuConApi from "./API/MtuConApi.js";
import InitiateConMtuViwer from'./InitiateConMtuViwer.js';
import PhidgetServerConHandler from"./Functions/Phidgets/ConnectToPhidgetServer.js";

var serverAddress = MtuConApi.backend["serverAddress"];
var serverPort = MtuConApi.backend["port"];

const io = new Server(serverPort, {    
    cors: { 
        origin: `http://${serverAddress}:${serverPort-1}`,
        methods: ["GET", "POST"],
        credentials: false
    }
});   
console.log(`MTU Server is started on port nr: ${MtuConApi.backend["port"]} and waiting for MTU viewer connection!`);
// Request the Phidgets server connection
    console.log("Request connection for Phidgets Server");

    PhidgetServerConHandler(io);
    
    // Initiate connection for MtuViwer
    InitiateConMtuViwer(io);
console.log("-------------------------------------------------------------------------------");