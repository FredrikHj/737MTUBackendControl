import phidget22, { InputMode } from"phidget22";
import initilizeThL1 from'./Phidgets/PhidgetsControl/ThrottleFunctions/InitilizeThL1.js';
import ConnectionApi from"../../737MTUBackendControl/API/ConnectionApi.js";
import MotorControllerEventsTh1_2Api from"../API/Phidgets/MotorControllerEventsTh1_2Api.js";
import {Th1Lever} from"./FlightSimSettings/Throttle1.js";

// Show the quantity of accurs errors
    var errorAccurs = 0;

var PhidgetServerConHandler = (socketInstance) =>{
    console.log('PhidgetServer Connection Handler');
    
    var connectToPhidgetServer = async(instance) => {
        console.log('errorAccurs :', errorAccurs); 

        var phidgetsConn = new phidget22.NetworkConnection({
            hostname: ConnectionApi.phidgets["serverHostname"],
            port: ConnectionApi.phidgets["serverPort"],
            name: ConnectionApi.phidgets["serverName"],  
            passwd: "",
            onAuthenticationNeeded: function() { return "password"; },
            onError: () => {
                errorAccurs++; 
                console.log("Phidgets Networkserver has an error");
                ConnectionApi.phidgets["serverMess"] = "Not Connected"; 
                ConnectionApi.phidgets["conLostMess"] = "Connection error - Retrying";

                ConnectionApi.phidgets["isConnected"] = false;
                ConnectionApi.phidgets["isError"] = true;
                
                // Resend the connection object once to avoid a loop at the client side 
               // errorAccurs === 1 && instance.emit("mtuInit", ConnectionApi);
                console.log('errorAccurs :', errorAccurs);

                ConnectionApi.phidgets["isConnected"] === false &&
                    instance.emit("mtuInitiation", ConnectionApi, (response) => { 
                        console.log('response :', response);
                    })
                // restart the server
                connectToPhidgetServer(socketInstance);
            },  
            onConnect: function() {
                ConnectionApi.phidgets["isConnected"] === false && 
                console.log("Phidgets Networkserver is connected and MTU is ready to work")
                
                ConnectionApi.phidgets["isConnected"] = true;
                ConnectionApi.phidgets["serverMess"] = "Connected"; 
                ConnectionApi.phidgets["isError"] = false;
                
                 // Not running if Phidgets is not connected
                ConnectionApi.phidgets["isConnected"] === true &&
                    instance.emit("mtuInitiation", ConnectionApi, (response) => { 
                        console.log('response :', response);
                    })
                // Resend the connection object once to avoid a loop at the client side 
                //console.log('errorAccurs :', errorAccurs);
                 
                // Reset the quantity of accurs errors 
                    errorAccurs = 0;
                    
                console.log("------------------------------------------------------------------");
                console.log("Start controlling phidgets Motor controller!");
                initilizeThL1(instance, Th1Lever["positionCurrent"], Th1Lever["positionTarget"], Th1Lever["runMotor"]);     
             
            },
            onDisconnect: function() { 
                console.log("Phidgets Networkserver - Disconnected");
                ConnectionApi.phidgets["isConnected"] = false;
                ConnectionApi.phidgets["serverMess"] = "Server is Disconnected!";
                ConnectionApi.phidgets["isError"] = true;

                // Resend a message to client
                  

            }
        })
        //-------------------------------------------------------
        try { 
            return await phidgetsConn.connect().then(() => {})
        } catch(err) {
            console.log("Phidgets Networkserver - Connection Error:");
            //process.exit(1);
                setTimeout(() => {
                    ConnectionApi.phidgets["isConnected"] = false;
                    ConnectionApi.phidgets["isError"] = true;
                    ConnectionApi.phidgets["serverMess"] = "Not Connected";
                    ConnectionApi.phidgets["conLost"] = true;
                    ConnectionApi.phidgets["conLostMess"] = "Connection error - Retrying";

                    connectToPhidgetServer(socketInstance);
                }, 2000); 
        } 
        
    }
    connectToPhidgetServer(socketInstance);
    console.log('Before Ttimeout ConnectionApi to send for client: ', ConnectionApi);
    setTimeout(() => {
        console.log('After TimeOut ConnectionApi to send for client: ', ConnectionApi);
    }, 2000);
    //return ConnectionApi.backend["isConnected"]

}   

export default PhidgetServerConHandler;