import connectToMTUBoards from "./connectToMTUBoards.js";
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

// Middleware
    let InitilizeMTU = (req, res, next) => { 

            phidget22.Log.enable(phidget22.LogLevel.INFO);
            connectToMTUBoards();
    
        next(); 
    }
app.get('/InitilizeMTU', InitilizeMTU, (req, res) => {
    res.status(200).send( );  

})