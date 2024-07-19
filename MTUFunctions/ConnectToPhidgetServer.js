import phidget22 from"phidget22";
import initilizeThL1 from'./Phidgets/PhidgetsControl/ThrottleFunctions/InitilizeThL1.js';
import ConnectionApi from"../../737MTUBackendControl/API/ConnectionApi.js";
import {mtuValuesApi} from"../../737MTUBackendControl/API/InititlizeMTUApi.js";

// Show the quantity of accurs errors
    var errorAccurs = 0;

var PhidgetServerConHandler = (socketInstance) =>{
    console.log('PhidgetServer Connection Handler');
    
    var connectToPhidgetServer = async(instance) => {
        console.log('errorAccurs :', errorAccurs);

        var phidgetsConn = new phidget22.NetworkConnection({
            hostname: "localhost",
            port: 5661,
            name: "Phidget Server Connection",
            passwd: "",
            onAuthenticationNeeded: function() { return "password"; },
            onError: () => {
                errorAccurs++;
                console.log("Phidgets Networkserver has an error");
                ConnectionApi.mtuMess = "MTU Server has an error";
                ConnectionApi.isPhidgetsConnected = false;
                ConnectionApi.phidgetServerError = true;
                
                // Resend the connection object once to avoid a loop at the client side 
                errorAccurs === 1 && instance.emit("mtuInit", ConnectionApi);
                console.log('errorAccurs :', errorAccurs);
            }, 
            onConnect: function() {
                ConnectionApi.phidgets.isConnected === false && 
                console.log("Phidgets Networkserver is connected and MTU is ready to work")
                
                ConnectionApi.phidgets.isConnected = true;
                ConnectionApi.phidgets.serverMess = "Connected"; 
                ConnectionApi.phidgets.isError = false;
                
                // Resend the connection object once to avoid a loop at the client side 
                console.log('errorAccurs :', errorAccurs);
                errorAccurs > 1 && instance.emit("mtuInit", ConnectionApi);
                
                // Reset the quantity of accurs errors
                    errorAccurs = 0;
                // Set the states in Store
                //initializeStore.dispatch(setConnected(true));
                /* initializeStore.dispatch(setConBottonShowable(false));
                initializeStore.dispatch(setLabelConButton(generalTexts.conButton["disconnect"]));  
                initializeStore.dispatch(setStateName(generalTexts.conStates.phidgets.webService["started"]));
                
                setTimeout(() => {
                    initializeStore.dispatch(setConnectionInfo({
                        dataReceived: true,
                        receivedData: {     
                            serverLocation: serviceServerConfig.phidgets["hostname"],
                            port: serviceServerConfig.phidgets["port"],
                            messeg
                            nes: generalTexts.conStates.phidgets.webService["started"], 
                            connect: true
                            }
                    }));
                }, 1000);
                
                initializeStore.dispatch(setErrorOccured({
                    isError: false,
                    }
                )); */
            
            },
            onDisconnect: function() { 
                console.log("Phidgets Networkserver - Disconnected");
                ConnectionApi.isPhidgetsConnected = false;
                ConnectionApi.mtuMess = "Server is Disconnected!";
                ConnectionApi.phidgetServerError = true;

                // Resend a message to client
                instance.emit("mtuInit", ConnectionApi);
                
                /* 
                initializeStore.dispatch(setConnected(false));
                initializeStore.dispatch(setLabelConButton(generalTexts.conButton["connect"]));  
                initializeStore.dispatch(setStateName(""));
                
                // Sett if all nonen of the services are disconnected
                initializeStore.dispatch(setServicesConnected(false));
                 
                setTimeout(() => {
                    initializeStore.dispatch(setConnectionInfo({
                        dataReceived: false,
                        receivedData: {}
                        }
                        ));
                }, 1000);   
                initializeStore.dispatch(setErrorOccured(
                    {
                        isError: true, 
                        errorMessegnes: generalTexts.conStates.phidgets["programError"],
                    }
                    ));
                    } */
            }
        })
        //-------------------------------------------------------
        //f(ConnectionApi.isPhidgetsConnected === false){ 
           try { 
                return await phidgetsConn.connect().then(() => {})
            } catch(err) {
                console.log("Phidgets Networkserver - Connection Error:");
                //process.exit(1);
                setTimeout(() => {
                    connectToPhidgetServer(socketInstance);
                    ConnectionApi.isPhidgetsConnected = false;
                    ConnectionApi.phidgetServerError = true;
                }, 2000); 
            } 
        //}
    }
    connectToPhidgetServer(socketInstance);
}   

export default PhidgetServerConHandler;