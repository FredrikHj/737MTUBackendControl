// Import FlightSimulator modules 
import phidget22 from 'phidget22';
import PositionsApi from'./API/Phidgets/PositionsApi.js';
import PhidgetServerConHandler from"./MTUFunctions/ConnectToPhidgetServer.js";
import ConnectionApi from"./API/ConnectionApi.js";
import log from 'node-gyp/lib/log.js';
var acknowledgementsDone = false; 
   
var mtuServerInitiation = (socketIOInstance) => { 
    // Initilize the Phidgets server connection
        PhidgetServerConHandler(socketIOInstance);
     
    // Socket.IO start the connection and begins to listen for a client
    socketIOInstance.on("connection", (socket) => {
       console.log('Socket has connect: ', socket.connected);               

       socket.emit("mtuInitiation", ConnectionApi, (response) => {
            console.log(`MTU Server has done a request to client and got the Response of: ${response.status}`);
                console.log(`They are now connected with ID of: ${socket.id}`);

                if(response.status === 200){
                    ConnectionApi.frontend["isConnected"] = true;
                    ConnectionApi.frontend["clientMess"] = "connected";

                    console.log("-----------------------------------------------------");
                    console.log("ConnectionApi: ", ConnectionApi.backend["isConnected"]); 
                    //console.log(`MTU Server and Client has reconnected with a new Connection ID: ${socket.id}`);
                                     
                    // Enable Log   
                    phidget22.Log.enable(phidget22.LogLevel.INFO); 
                }
             
        });   
        socket.on("disconnect", (reason) => {
            ConnectionApi.frontend["isConnected"] = false;
            console.log(`Socket are connect: ', ${socket.connected} and the reason is: ${reason}`);
        });
    });
} 

export default mtuServerInitiation; 