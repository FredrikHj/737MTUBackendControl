// Import FlightSimulator modules 
import phidget22 from 'phidget22';
import PositionsApi from'./API/Phidgets/PositionsApi.js';
import ApiToBeSend from"./API/ApiToSend.js";
import log from 'node-gyp/lib/log.js';
var acknowledgementsDone = false; 

// API To Backend / Phidgets / Frontend
var apiToBackend = ApiToBeSend.MTUConParts.backend;
var apiToFrontend = ApiToBeSend.MTUConParts.frontend;
var apiToPhidgets = ApiToBeSend.MTUConParts.phidgets;

var InitiateConMtuViwer = (socketIOInstance) => {   
        // Enable Log   
            phidget22.Log.enable(phidget22.LogLevel.INFO); 
    // Socket.IO start the connection and begins to listen for a client
    socketIOInstance.on("connection", (socket) => {
        // Set the current connection ID into the API
        apiToBackend["serverClientConId"] = socket.id;        
        socket.emit("mtuInitiation", ApiToBeSend, (response) => {
            if(response.status === 200){
                apiToFrontend["isConnected"] = true;
                console.log(`MTU Server has done a request to client and got the Response of: ${response.status} with the ID of \n ${socket.id}`);

                    console.log("-----------------------------------------------------");
                    console.log("Is the MTUServer Connected? ", apiToBackend["isConnected"]); 
                    //console.log(`MTU Server and Client has reconnected with a new Connection ID: ${socket.id}`);
                                     
                   
                }
        });   
        socket.on("disconnect", (reason) => {
            apiToFrontend["isConnected"] = false;
            console.log(`Socket are connect: ', ${socket.connected} and the reason is: ${reason}`);
        });
    });
} 

export default InitiateConMtuViwer; 