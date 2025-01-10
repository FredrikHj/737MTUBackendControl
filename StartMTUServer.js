// Creates a Socket.IO server for Node JS for the controlment for the MTU Unit 
import { Server } from "socket.io";
import mtuServerInitiation from'./MtuServerInitiation.js';
const port = 3001;
const io = new Server(port, {    
    cors: { 
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: false
    }
});   
console.log(`MTU Server is started on port nr: ${port} and waiting for MTU viewer connection!`);
console.log("-------------------------------------------------------------------------------");

mtuServerInitiation(io);