// Import FlightSimulator modules 
    //import readMtuFuncPos from "../../../../API/Phidgets/PositionsApi.js";

import CenterLeversInstances from'../CenterLevers/CenterLeversInstances.js';
import ApiToBeSend from"../../../../API/ApiToSend.js";

import motorControllingValuesApi from'../../../../API/Phidgets/MotorControllingValuesApi.js';
import MotorControllerEventsTh1_2Api from'../../../../API/Phidgets/MotorControllingEventsApi.js';
import PhidgetsConApi from'../../../../API/Phidgets/PhidgetsBoardsConApi.js';
import boardControllValues from"../../PhidgetsControl/BoardControllValues.js";

//import PhidgetServerConHandler from"../../../ConnectToPhidgetServer.js";

var initPBController = async(socketInstance, positionCurrent, positionTarget, runMotor) => {
    console.log('Start the Boards controller of --> Parking Brake');

    // Initilate functions classes from the API
        const motorPositionController = CenterLeversInstances.thLevers["positionController"]();

    //Set addressing parameters to specify which channel to open (if any)
        const deviceSerialNr = 668208;
        const deviceChannel = 0;
        const deviceHubPort = 0;

        motorPositionController.setDeviceSerialNumber(deviceSerialNr);
        motorPositionController.setChannnel = deviceChannel;
        motorPositionController.setHubPort(deviceHubPort);

    //Assign any event handlers you need before calling open so that no events are missed.   
        MotorControllerEventsTh1_2Api["onAttach"](motorPositionController);
        MotorControllerEventsTh1_2Api["onDetach"](motorPositionController);
        MotorControllerEventsTh1_2Api["onError"](motorPositionController);

    // Set the API for the controller
        var apiPath = PhidgetsConApi.pBController;
        apiPath["isConnected"] = true;
        apiPath["conMess"] = "Connect";
        apiPath["intoDevice"] = "SBC4";
        apiPath["deviceSerialNr"] = deviceSerialNr;
        apiPath["deviceHubPort"] = deviceHubPort;
        apiPath["deviceChannel"] = deviceChannel;

        // Trying to open the connection
        /* try { 
            //Open your Phidgets and wait for attachment
                await motorPositionController.open(5000);
                
                

            
            
            // Resend te API
                instance.emit("mtuInitiation", ApiToBeSend, (response) => { 
                    console.log('Resend the board informtion about Parking Brake');
                    console.log('response :', response);
                })
        } catch(err) { 
            console.log("Phidgets Networkserver - Channel open error:" + err);
            initPBController(
                socketInstance,
                boardControllValues.th1Lever["positionCurrent"],
                boardControllValues.th1Lever["positionTarget"],
                boardControllValues.th1Lever["runMotor"]
            );
            //process.exit(1);
        } */  
             
        //Do stuff with your Phidgets here or in your event handlers.
        /* 
            doStuffTryCatch(motorPositionController.setKp(ControllerValuesApi.thL1_2["setKp"]), "setKp", socketInstance);
            doStuffTryCatch(motorPositionController.setKi(ControllerValuesApi.thL1_2["setKi"]), "setKi", socketInstance); 
            doStuffTryCatch(motorPositionController.setKd(ControllerValuesApi.thL1_2["setKd"]), "setKd", socketInstance);
            doStuffTryCatch(motorPositionController.setDeadBand(ControllerValuesApi.thL1_2["setDeadBand"]), "setDeadBand", socketInstance)
            doStuffTryCatch(motorPositionController.setAcceleration(ControllerValuesApi.thL1_2["setAcceleration"]), "setAcceleration", socketInstance)
            doStuffTryCatch(motorPositionController.setVelocityLimit(ControllerValuesApi.thL1_2["setVelocityLimit"]), "setTargetPosition", socketInstance)
            doStuffTryCatch(motorPositionController.setTargetPosition(positionTarget), "setTargetPosition", socketInstance)
            doStuffTryCatch(motorPositionController.setEngaged(runMotor), "setEngaged", socketInstance)
        */
        

        //Do something with the positions value
            //MotorControllerEventsTh1_2Api["onPositionChange"]("ThL1", socketInstance, motorPositionController);              
}

let doStuffTryCatch = async(whatToDo, errorMess, instance) => {
    try {
        await whatToDo;
    } catch(err) {  
        console.error(`Error in sett ${errorMess} - ` + err);
        // restart the server
        errorMess === "setEngaged" && PhidgetServerConHandler.connectToPhidgetServer(instance);
    }
}
export default initPBController; 