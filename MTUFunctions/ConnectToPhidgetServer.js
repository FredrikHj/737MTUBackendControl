import phidget22 from"phidget22";
import initilizeThL1 from'./Phidgets/PhidgetsControl/ThrottleFunctions/InitilizeThL1.js';
import ConnectionApi from"../../737MTUBackendControl/API/ConnectionApi.js";

var ConnectToPhidgetServer = async() => {

    console.log('isPhidgetsConnected :', ConnectionApi.isPhidgetsConnected);

    var phidgetsConn = new phidget22.NetworkConnection({
        hostname: "hub5000.local",//serviceServerConfig["phidgets"]["hostname"],
        port: 5661, //serviceServerConfig["phidgets"]["port"],
        name: "Phidget Server Connection",
        passwd: "",
        onAuthenticationNeeded: function() { return "password"; },
        onError: () => {
            ConnectionApi.isPhidgetsConnected = false;
            ConnectionApi.phidgetServerError = true;
            
            /*  initializeStore.dispatch(setErrorOccured(
                {
                    isError: true, 
                    errorMessegnes: generalTexts.conStates.phidgets["programError"],
                }
                ));  */
            }, 
            onConnect: function() { 
                console.log("Phidgets Networkserver - Connection is established and MTU is ready to work");
                ConnectionApi.isPhidgetsConnected = true;
                ConnectionApi.phidgetServerError = false;

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
                ConnectionApi.phidgetServerError = true;

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
     if(ConnectionApi.isPhidgetsConnected === false) 
        try {
            return await phidgetsConn.connect().then(() => {})
        } catch(err) {
            console.log("Phidgets Networkserver - Connection Error:");
            //process.exit(1);
            setTimeout(() => {
                ConnectToPhidgetServer();
                ConnectionApi.isPhidgetsConnected = false;
                ConnectionApi.phidgetServerError = true;
            }, 2000);
        } 
        console.log('ConnectionApi.phidgetServerError  :', ConnectionApi.phidgetServerError );
    }

/*     setTimeout(() => {
        initilizeThL1(0, 1000, true); 
    }, 4000); */

export default ConnectToPhidgetServer;