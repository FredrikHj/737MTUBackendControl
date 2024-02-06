// Import FlightSimulator modules 
import phidget22  from 'phidget22';
import inititlizeMTUApi from'./InititlizeMTUApi.js';

let serviceConnected = false;

// Recusive function for check if service is 
//var isServicesConnected = () => { 
    
var phidgetsServerConnection = async() => {
    
    //const conn = new phidget22.NetworkConnection(5661, "localhost"/* 'hub5000.local' */);
	try {
		var phidgetsConn = new phidget22.NetworkConnection({
			hostname: "localhost",
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
				inititlizeMTUApi.isServiceConnected["isPhidgetsConnected"] = true;

				/* Set the staates in Store
					initializeStore.dispatch(setConBottonShowable(false));
					initializeStore.dispatch(setConnected(true));
					initializeStore.dispatch(setLabelConButton(generalTexts.conButton["disconnect"]));  
					initializeStore.dispatch(setStateName(generalTexts.conStates.phidgets.webService["started"]));
	
				setTimeout(() => {
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
				inititlizeMTUApi.isServiceConnected["isPhidgetsConnected"] = false;
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
    
	
	/*
	//Create your Phidget channels
	const bldcMotor0 = new phidget22.BLDCMotor(); 

	//Set addressing parameters to specify which channel to open (if any)
	bldcMotor0.deviceSerialNumber = 668208;
    bldcMotor0.channel = 0;  

	//Assign any event handlers you need before calling open so that no events are missed.
	bldcMotor0.onAttach = () => {
		console.log('Attach!');
	};
 
	bldcMotor0.onDetach = () => {
		console.log('Detach!');
	};

	bldcMotor0.onError = (code, description) => {
		console.log('Description: ' + description.toString());
		console.log('----------');  
	}; 
	
	//Open your Phidgets and wait for attachment
	try {
		await bldcMotor0.open(5000);
	} catch(err) {
        console.log("Phidgets Networkserver - Connection Error:", err);

		process.exit(1);
	}

	//Do stuff with your Phidgets here or in your event handlers.
	try {
		await bldcMotor0.setTargetVelocity(0.5);
	} catch(err) {
		console.error('Error during setTargetVelocity', err);
		process.exit(1);
	}


	setTimeout(async () => {
		//Close your any Phidgets and connections once the program is done.
		await bldcMotor0.close();
		conn.close();
		conn.delete();
	}, 50000);
    var test = AvailabilityOfFSIPCInstance$;  
    console.log('test :', test);
    //Check services connection
        var initializeStoreState = initializeStore.getState();
        var isFsuipcConnected = initializeStoreState.serviceFSUIPC["connected"];
        var isPhidgetsConnected = initializeStoreState.servicePHIDGETS["connected"];
    
    // Sett if all services are connected
    initializeStore.dispatch(setServicesConnected(true));

    console.log("FSUIPC Connnected? - "+ isFsuipcConnected);
    console.log("Phidgets Connected? - "+ isPhidgetsConnected);

    if(isPhidgetsConnected === true) {
        console.log("Ready to InitilizeMTUFunctions");
        BSLControllerTHL1();
    } */
	await phidgetsConn.connect().then(() => {})
}
export default phidgetsServerConnection;