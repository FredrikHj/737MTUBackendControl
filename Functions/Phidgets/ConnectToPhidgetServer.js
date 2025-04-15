import phidget22, { InputMode } from"phidget22";
import ApiToBeSend from"../../API/ApiToSend.js";
import HeadController from"./PhidgetsControl/HeadController.js";
import boardControllValues from"../Phidgets/PhidgetsControl/BoardControllValues.js";

// Show the quantity of accurs errors
    var errorAccurs = 0;

// API To Phidgets
    var apiToPhidgets = ApiToBeSend.MTUConParts.phidgets;
var PhidgetServerConHandler = (socketInstance) =>{
    console.log('PhidgetServer Connection Handler is started!');
    
    var connectToPhidgetServer = async(instance) => {
        console.log('errorAccurs :', errorAccurs); 

        var phidgetsConn = new phidget22.NetworkConnection({
            hostname: apiToPhidgets["serverHostname"],
            port: apiToPhidgets["serverPort"],
            name: apiToPhidgets["serverName"],  
            passwd: "",
            onAuthenticationNeeded: function() { return "password"; },
            onConnect: function() {
                apiToPhidgets["isConnected"] === false && console.log("Phidgets Networkserver is connected and MTU is ready to work")
                
                apiToPhidgets["isConnected"] = true;
                apiToPhidgets["serverMess"] = "Connected"; 
                apiToPhidgets["isError"] = false;
                //console.log('apiToPhidgets to be send :', apiToPhidgets);
                console.log('Phidgets Is connected? ', apiToPhidgets["isConnected"]);
                
                // Not running if Phidgets is not connected
                apiToPhidgets["isConnected"] === true &&
                    // Initiates the MTU controllers    
                        HeadController(instance, boardControllValues);

                   /*  instance.emit("mtuInitiation", ApiToBeSend, (response) => { 
                        console.log('response :', response);
                    }) */
                 // Resend the connection object once to avoid a loop at the client side 
                //console.log('errorAccurs :', errorAccurs);
                 
                // Reset the quantity of accurs errors 
                    errorAccurs = 0;
                    
                console.log("------------------------------------------------------------------");
             
            },
            onDisconnect: function() { 
                console.log("Phidgets Networkserver - Disconnected");
                /*
                apiToPhidgets["isConnected"] = false;
                apiToPhidgets["serverMess"] = "Disconnected!";
                apiToPhidgets["isError"] = true;
 */
                // Resend a message to client 
            },
            onError: () => {
                errorAccurs++; 
                console.log("Phidgets Networkserver has an error");
                apiToPhidgets["serverMess"] = "Not Connected"; 
                apiToPhidgets["conLostMess"] = "Connection error - Retrying";

                apiToPhidgets["isConnected"] = false;
                apiToPhidgets["isError"] = true;
                console.log('Phidgets Is connected? ', apiToPhidgets["isConnected"]);
                
                // Resend the connection object once to avoid a loop at the client side 
                errorAccurs === 1 && instance.emit("mtuInit",  apiToPhidgets);
                console.log('errorAccurs :', errorAccurs);

                apiToPhidgets["isConnected"] === false &&
                    instance.emit("mtuInitiation", ApiToBeSend, (response) => { 
                        console.log('response :', response);
                    })
                // restart the server
                //connectToPhidgetServer(socketInstance);0
            },
        })
        //-------------------------------------------------------
        try { 
            return await phidgetsConn.connect().then(() => {})
        } catch(err) {
            //process.exit(1);
            apiToPhidgets["isConnected"] = false;
            console.log(`Phidgets Server is not Connected --> Retrying to connnect`);
            apiToPhidgets["isError"] = true;
            apiToPhidgets["serverMess"] = "Not Connected";
 
            apiToPhidgets["conLost"] = true;
             console.log("Phidgets Networkserver - Disconnected");
             setTimeout(() => {
                apiToPhidgets["conLostMess"] = "Internal Error: Retrying to connnect";
                   instance.emit("mtuInitiation",  ApiToBeSend, (response) => { 
                    console.log('response :', response);
                })
                connectToPhidgetServer(socketInstance);
            }, 2000); 
            /*
            */
        }  
    }
    /* 
    console.log('Before Ttimeout objectPathConCombinedAPI to send for client: ', objectPathConCombinedAPI);
    setTimeout(() => {
        console.log('After TimeOut objectPathConCombinedAPI to send for client: ', objectPathConCombinedAPI);
        }, 2000);  */
        connectToPhidgetServer(socketInstance);
        //return MtuConApi.backend["isConnected"]
        
}    

export default PhidgetServerConHandler;