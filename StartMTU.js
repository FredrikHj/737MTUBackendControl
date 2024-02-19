// Import FlightSimulator modules 
import phidget22  from 'phidget22';
import {inititlizeMTUConnectedApi, readMtuFuncPos} from'./InititlizeMTUApi.js';

import phidgetsServerConnection from "./PhidgetsServerConnection.js";
// Creates a Express server in Node JS    
import express from'express';
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

// Connect to PhidgetsServer
    phidgetsServerConnection();

// Middleware
    let InitilizeMTU = (req, res, next) => { 
 
                phidget22.Log.enable(phidget22.LogLevel.INFO);
        
        next(); 
    }
app.get('/InitilizeMTU', InitilizeMTU, (req, res) => {
    res.status(200).send(readMtuFuncPos);

})  