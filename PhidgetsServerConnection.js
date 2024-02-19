// Import FlightSimulator modules 
import phidget22  from 'phidget22';
import {inititlizeMTUConnectedApi} from'./InititlizeMTUApi.js';
import initilizeThL1 from'./MTUFunctions/InitilizeThL1.js';
//import initilizeTest2 from'./MTUFunctions/Test2.js';

let serviceConnected = false;

// Recusive function for check if service is 
//var isServicesConnected = () => { 
    
var phidgetsServerConnection = async() => {
    
    //const conn = new phidget22.NetworkConnection(5661, "localhost"/* 'hub5000.local' */);
	try {
		phidget22.Log.enable(phidget22.LogLevel.INFO);
		var phidgetsConn = new phidget22.NetworkConnection({
			hostname: 
			//"localhost"
			"hub5000.local",
			port: 5661,
			name: "Phidget Server Connection",
			passwd: "", 
			onAuthenticationNeeded: function() { return "password"; }, 
			onError: () => {
				//console.log("Phidgets Networkserver - Connection Error:", msg);
/* 	 
				initializeStore.dispatch(setErrorOccured(
					{
						isError: true, 
						errorMessegnes: generalTexts.conStates.phidgets["programError"],
					}
				)); */ 
			},
			onConnect: function() {
				console.log("Phidgets Networkserver - Connection is established and MTU is ready to work");
				inititlizeMTUConnectedApi["isPhidgetsConnected"] = true;
				initilizeThL1(0, 2500, true); 
				//initilizeTest2(); 
				/* Set the staates in Store
					initializeStore.dispatch(setConBottonShowable(false));
					initializeStore.dispatch(setConnected(true));
					initializeStore.dispatch(setLabelConButton(generalTexts.conButton["disconnect"]));  
					initializeStore.dispatch(setStateName(generalTexts.conStates.phidgets.webService["started"]));
	
				setTimeout(() => {  b
						initializeStore.dispatch(setConnectionInfo({
						dataReceived: true,
						receivedData: {     
							serverLocation: serviceServerConfig.phidgets["hostname"],
							port: serviceServerConfig.phidgets["port"],
							messegnes: generalTexts.conStates.phidgets.webService["started"], 
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
				inititlizeMTUConnectedApi["isPhidgetsConnected"] = false;
/* 				initializeStore.dispatch(setConnected(false));
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
				)); */
			}
		});
	
		/* await conn.connect().then(() => {
            console.log("Phidgets Networkserver - Connection is established and MTU is ready to work");
        }); */


	} catch(err) {
		console.error('Error during connect', err);
		setInterval(() => {phidgetsServerConnection();}, 2000);
		process.exit(1);
	}
    	await phidgetsConn.connect().then(() => {})
}
export default phidgetsServerConnection;