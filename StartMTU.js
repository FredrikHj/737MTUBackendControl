import { setTimeout } from "timers/promises";
import phidgetsServerConnection from "./PhidgetsServerConnection.js";
// Creates a Express server in Node JS    

import express from'express';
const app = express();
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
    app.get('/InitilizeMTU', (req, res) => {
        console.log("Incomming req");
        setTimeout(() => {
            res.status(200).send({"text": "Hej MTU :)"});
    }, 1000);

    })