import phidget22  from 'phidget22';
import serviceServerConfig from "./serviceServerConfig.js";
// Creates a Express server in Node JS and use diff... modules    
/* const express = require('express');
const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
)
  
app.use(express.json());  

// The server information
const port = 3000;
app.listen(port, () => console.log(`MediaVisare is listening on port ${port}!`));  */

var runExample = async () => {
    var phidgetsConn = new phidget22.NetworkConnection({
        hostname: serviceServerConfig["phidgets"]["hostname"],
        port: serviceServerConfig["phidgets"]["port"],
        name: "Phidget Server Connection",
        passwd: "",
        onAuthenticationNeeded: function() { return "password"; },
        onError: () => {
            console.log("Phidgets Networkserver - Connection Error:", msg);
        },
        onConnect: function() {
            console.log("Phidgets Networkserver - Connection is established and MTU is ready to work");
        },
        onDisconnect: function() { 
            console.log("Phidgets Networkserver - Disconnected");
        }
    });
      
    await phidgetsConn.connect().then(() => {})

    const bldcMotor0 = new phidget22.BLDCMotor();
    bldcMotor0.channel = 0;
	bldcMotor0.hubPort = 1;
	bldcMotor0.deviceSerialNumber = 668208;
/* 	bldcMotor0.onAttach = () => {
		console.log('Attach!');
	}; 
 
	bldcMotor0.onDetach = () => {
		console.log('Detach!');
	};
 */
	await bldcMotor0.open(5000);
    bldcMotor0.onAttach = ()=> {
        // You can access the Phidget that fired the event using this function's parameter
        let deviceSerialNumber = this.deviceSerialNumber
        console.log('deviceSerialNumber :', deviceSerialNumber);
    }
    await bldcMotor0.setTargetVelocity(1);
}
 
runExample();
/* 
	//Create your Phidget channels
	const bldcMotor0 = new phidget22.BLDCMotor(); 

	//Set addressing parameters to specify which channel to open (if any)
	bldcMotor0.hubPort = 1;
	bldcMotor0.deviceSerialNumber = 668208;
    bldcMotor0.channnel = 0;
    //bldcMotor0.isHubPortDevice = false;

    //Assign any event handlers you need before calling open so that no events are missed.
	bldcMotor0.onAttach = () => {
		console.log('Attach!');
	};

    //console.log('bldcMotor0 :', bldcMotor0);

	//Open your Phidgets and wait for attachment
	await bldcMotor0.open(15000);

	bldcMotor0.onAttach = () => {
		console.log('Attach!', bldcMotor0);
	};

	//Do stuff with your Phidgets here or in your event handlers.
	await bldcMotor0.setTargetVelocity(1);
}
    runExample(); */
// Middleware
/* let reqMediaRootPath = (req, res, next) => {
  
    // Get the current mediaPath
    let reqQuery = req.query;
    let targetMediaType = reqQuery.type;
    let targetSQLData = reqQuery.path;
    if (Boolean('reqQuery.rootPath') === true) {   
        getSQLData.runSQLConn(getSQLData.buildCorrectSQLStatement(targetMediaType), targetMediaType);
        getSQLData.runSQLConn(getSQLData.buildCorrectSQLStatement('description'), 'description');

        setTimeout(() => {
               
            let mediaRootPath = getSQLData.incommingMediaPath()[0];
            app.use(express.static(mediaRootPath));
            reqMediaObj.runGetMedia(targetMediaType, mediaRootPath, targetSQLData); 
        }, 500);
    }
    next();
    
} */
/* app.get('/ReqRootPath', reqMediaRootPath, (req, res) => {
    setTimeout(() => { 
        res.status(200).send(reqMediaObj.mediaListObj()); 
    }, 1000);
});   */