// Import FlightSimulator modules 
import phidget22 from 'phidget22';
import PositionsApi from'./API/Phidgets/PositionsApi.js';
import MtuConApi from"./API/MtuConApi.js";
import log from 'node-gyp/lib/log.js';
var acknowledgementsDone = false; 
   
var InitiateConMtuViwer = (socketIOInstance) => {   
        // Enable Log   
            phidget22.Log.enable(phidget22.LogLevel.INFO); 
    // Socket.IO start the connection and begins to listen for a client
    socketIOInstance.on("connection", (socket) => {
        // Set the current connection ID into the API
            MtuConApi.backend["serverClientConId"] = socket.id;        
        socket.emit("mtuInitiation", MtuConApi, (response) => {
            if(response.status === 200){
                MtuConApi.frontend["isConnected"] = true;
                console.log(`MTU Server has done a request to client and got the Response of: ${response.status} with the ID of \n ${socket.id}`);

                    console.log("-----------------------------------------------------");
                    console.log("Is the MTUServer Connected? ", MtuConApi.backend["isConnected"]); 
                    //console.log(`MTU Server and Client has reconnected with a new Connection ID: ${socket.id}`);
                                     
                   
                }
        });   
        socket.on("disconnect", (reason) => {
            MtuConApi.frontend["isConnected"] = false;
            console.log(`Socket are connect: ', ${socket.connected} and the reason is: ${reason}`);
        });
    });
} 

export default InitiateConMtuViwer; 