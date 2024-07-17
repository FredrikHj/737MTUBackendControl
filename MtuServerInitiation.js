// Import FlightSimulator modules 
import phidget22 from 'phidget22';
import {readMtuFuncPos} from'./API/MTUFuncPosApi.js';
import PhidgetServerConHandler from"./MTUFunctions/ConnectToPhidgetServer.js";
import ConnectionApi from"./API/ConnectionApi.js";

var mtuServerInitiation = (instanceType, instance) => {
    // Socket.IO start the connection
    instance.on("connection", socket => {
        socket.emit("mtuInitiation", ConnectionApi, (response) => {
            console.log('Viewer Response :', response);
        });

        socket.on("mtuInitiation", (connected, viewerAcknowledgements) => {
            
            
            ConnectionApi.backend["serverMess"] = "Conected";
            
            if(instanceType === "start" && connected === true){
                console.log(`MTU viewer is connected with ID: ${socket.id}`);
                console.log("-----------------------------------------------------");
                console.log("Connection request from the MTU Viewer. Connected? ", connected);
                
                //console.log(`MTU Server and Client has reconnected with a new Connection ID: ${socket.id}`);
                
                // Initilize the server Client connection and begin Sending events to the listerner client
                    PhidgetServerConHandler(instance);
                    
                // Enable Log
                    phidget22.Log.enable(phidget22.LogLevel.INFO); 
                
                // Give time to the services to start up
/*                     setTimeout(() => { 
                        // Send the connection object 
                        socket.emit("mtuInitiation", ConnectionApi, (response) => {
                            console.log('response :', response);
                        });
                    }, 1000);  */
            }
            viewerAcknowledgements({
                data: ConnectionApi.backend,
                status: 200,
            });
        })
    });        
}

export default mtuServerInitiation;