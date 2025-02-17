import phidget22, { InputMode } from"phidget22";
import MtuConApi from"../../API/MtuConApi.js";
import HeadController from"./PhidgetsControl/HeadController.js";

// Show the quantity of accurs errors
    var errorAccurs = 0;

var PhidgetServerConHandler = (socketInstance) =>{
    console.log('PhidgetServer Connection Handler is started!');
    
    var connectToPhidgetServer = async(instance) => {
        console.log('errorAccurs :', errorAccurs); 

        var phidgetsConn = new phidget22.NetworkConnection({
            hostname: MtuConApi.phidgets["serverHostname"],
            port: MtuConApi.phidgets["serverPort"],
            name: MtuConApi.phidgets["serverName"],  
            passwd: "",
            onAuthenticationNeeded: function() { return "password"; },
            onConnect: function() {
                MtuConApi.phidgets["isConnected"] === false && console.log("Phidgets Networkserver is connected and MTU is ready to work")
                
                MtuConApi.phidgets["isConnected"] = true;
                MtuConApi.phidgets["serverMess"] = "Connected"; 
                MtuConApi.phidgets["isError"] = false;
                console.log('MtuConApi.phidgets to be send :', MtuConApi.phidgets);
                console.log('Phidgets Is connected? ', MtuConApi.phidgets["isConnected"]);
                
                // Not running if Phidgets is not connected
                MtuConApi.phidgets["isConnected"] === true &&
                    // Initiates the MTU controllers    
                        HeadController(instance);

                    instance.emit("mtuInitiation", MtuConApi, (response) => { 
                        console.log('response :', response);
                    })
                 // Resend the connection object once to avoid a loop at the client side 
                //console.log('errorAccurs :', errorAccurs);
                 
                // Reset the quantity of accurs errors 
                    errorAccurs = 0;
                    
                console.log("------------------------------------------------------------------");
             
            },
            onDisconnect: function() { 
                console.log("Phidgets Networkserver - Disconnected");
                /*
                MtuConApi.phidgets["isConnected"] = false;
                MtuConApi.phidgets["serverMess"] = "Disconnected!";
                MtuConApi.phidgets["isError"] = true;
 */
                // Resend a message to client 
            },
            onError: () => {
                errorAccurs++; 
                console.log("Phidgets Networkserver has an error");
                MtuConApi.phidgets["serverMess"] = "Not Connected"; 
                MtuConApi.phidgets["conLostMess"] = "Connection error - Retrying";

                MtuConApi.phidgets["isConnected"] = false;
                MtuConApi.phidgets["isError"] = true;
                console.log('Phidgets Is connected? ', MtuConApi.phidgets["isConnected"]);
                
                // Resend the connection object once to avoid a loop at the client side 
                errorAccurs === 1 && instance.emit("mtuInit", MtuConApi);
                console.log('errorAccurs :', errorAccurs);

                MtuConApi.phidgets["isConnected"] === false &&
                    instance.emit("mtuInitiation", MtuConApi, (response) => { 
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
            MtuConApi.phidgets["isConnected"] = false;
            console.log(`Phidgets Server is not Connected --> Retrying to connnect`);
            MtuConApi.phidgets["isError"] = true;
            MtuConApi.phidgets["serverMess"] = "Not Connected";
 
            MtuConApi.phidgets["conLost"] = true;
             console.log("Phidgets Networkserver - Disconnected");
             setTimeout(() => {
                MtuConApi.phidgets["conLostMess"] = "Internal Error: Retrying to connnect";
                   instance.emit("mtuInitiation", MtuConApi, (response) => { 
                    console.log('response :', response);
                })
                connectToPhidgetServer(socketInstance);
            }, 2000); 
            /*
            */
        }  
    }
    /* 
    console.log('Before Ttimeout MtuConApi to send for client: ', MtuConApi);
    setTimeout(() => {
        console.log('After TimeOut MtuConApi to send for client: ', MtuConApi);
        }, 2000);  */
        connectToPhidgetServer(socketInstance);
        //return MtuConApi.backend["isConnected"]
        
}    

export default PhidgetServerConHandler;