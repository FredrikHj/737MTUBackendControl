// Import FlightSimulator modules 
    //import readMtuFuncPos from "../../../../API/Phidgets/PositionsApi.js";

import CenterLeversInstances from'../CenterLevers/CenterLeversInstances.js';
import ApiToBeSend from"../../../../API/ApiToSend.js";

import motorControllingValuesApi from'../../../../API/Phidgets/Phidgets_MotorControllingValuesApi.js';
import MotorControllerEventsTh1_2Api from'../../../../API/Phidgets/Phidgets_MotorControllingEventsApi.js';
import PhidgetsConApi from'../Phidgets_ControllerBoardsApi.js';
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
        var apiPathConInfo = PhidgetsConApi.conInfo["pBController"];
        var apiPathBoardsValues = PhidgetsConApi.boardsValues["pBController"];
        apiPathConInfo["isConnected"] = true;
        apiPathConInfo["conMess"] = "Connect";
        apiPathConInfo["intoDevice"] = "SBC4";
        apiPathConInfo["deviceSerialNr"] = deviceSerialNr;
        apiPathConInfo["deviceHubPort"] = deviceHubPort;
        apiPathConInfo["deviceChannel"] = deviceChannel;
        apiPathBoardsValues["deviceChannel"] = deviceChannel;

        const valueKp = motorControllingValuesApi.thL1_2["setKp"];
        const valueKi = motorControllingValuesApi.thL1_2["setKi"];
        console.log('motorControllingValuesApi :', motorControllingValuesApi.thL1_2["setKi"]);
        const valueKd = motorControllingValuesApi.thL1_2["setKd"];
        const valueDeadBand = motorControllingValuesApi.thL1_2["setDeadBand"];
        const valueAcceleration = motorControllingValuesApi.thL1_2["setAcceleration"]
        const valueVelocityLimit = motorControllingValuesApi.thL1_2["setVelocityLimit"];           

        apiPathConInfo["kp"] = valueKp;
        apiPathConInfo["ki"] = valueKi;
        apiPathConInfo["kd"] = valueKd;
        apiPathConInfo["deadBand"] = valueDeadBand;
        apiPathConInfo["acceleration"] = valueAcceleration;
        apiPathConInfo["velocityLimit"] = valueVelocityLimit;
    
    
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
            doStuffTryCatch(motorPositionController.setKp(motorControllingValuesApi.thL1_2["setKp"]), "setKp", socketInstance);
            doStuffTryCatch(motorPositionController.setKi(motorControllingValuesApi.thL1_2["setKi"]), "setKi", socketInstance); 
            doStuffTryCatch(motorPositionController.setKd(motorControllingValuesApi.thL1_2["setKd"]), "setKd", socketInstance);
            doStuffTryCatch(motorPositionController.setDeadBand(motorControllingValuesApi.thL1_2["setDeadBand"]), "setDeadBand", socketInstance);
            doStuffTryCatch(motorPositionController.setAcceleration(motorControllingValuesApi.thL1_2["setAcceleration"]), "setAcceleration", socketInstance);
            doStuffTryCatch(motorPositionController.setVelocityLimit(motorControllingValuesApi.thL1_2["setVelocityLimit"]), "setTargetPosition", socketInstance);
            doStuffTryCatch(motorPositionController.setTargetPosition(positionTarget), "setTargetPosition", socketInstance);
            doStuffTryCatch(motorPositionController.setEngaged(runMotor), "setEngaged", socketInstance);
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