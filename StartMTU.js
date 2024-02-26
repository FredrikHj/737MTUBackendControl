// Creates a Express server in Node JS    
import express from'express';

// Import FlightSimulator modules 
import phidget22 from 'phidget22';
import {readMtuFuncPos} from'./API/MTUFuncPosApi.js';
import ConnectToPhidgetServer from"./MTUFunctions/ConnectToPhidgetServer.js";
import ConnectionApi from"./API/ConnectionApi.js";

// Creates a Express server in Node JS    
const app = express(); 
 
import cors from'cors';
app.use(cors());

app.use( 
    express.urlencoded({
        extended: true
    }) 
) 
  
app.use(express.json());  
// The server information  
const port = 3000;
app.listen(port, () => console.log(`MTU Controler is listening on port ${port}!`));

// Middleware
let RequestsPhidgetsConnectToServer = (req, res, next) => {            
    // Request for Connection if false try to connect     
        ConnectToPhidgetServer(); 
    
        // Enable Log
        //phidget22.Log.enable(phidget22.LogLevel.INFO); 

    next(); 
}
app.get('/RequestsPhidgetsConnect', RequestsPhidgetsConnectToServer, (req, res) => {
    console.log('ConnectionApi :', ConnectionApi);
    res.json(ConnectionApi);
})  