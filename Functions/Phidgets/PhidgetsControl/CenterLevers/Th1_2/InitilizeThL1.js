// Import FlightSimulator modules 
    //import readMtuFuncPos from "../../../../API/Phidgets/PositionsApi.js";

import CenterLeversInstances from'../CenterLeversInstances.js';

import ControllerValuesApi from'../../../../../API/Phidgets/DeviceControllingValuesApi.js';
import MotorControllerEventsTh1_2Api from'../../../../../API/Phidgets/MotorControllingEventsApi.js';
//import {Th1Lever} from"../ThrottleUnit1.js";
//import PhidgetServerConHandler from"../../../ConnectToPhidgetServer.js";

var initilateThL1 = async(socketInstance, positionCurrent, positionTarget, runMotor) => {
    // Initilate functions classes from the API
        const motorPositionController = CenterLeversInstances.thL1_2["motorPositionController"]();

    //Set addressing parameters to specify which channel to open (if any)
        motorPositionController.setDeviceSerialNumber(668208);
        motorPositionController.setChannnel = 0;
        motorPositionController.setHubPort(0);

    //Assign any event handlers you need before calling open so that no events are missed.   
        MotorControllerEventsTh1_2Api["onAttach"](motorPositionController);
        MotorControllerEventsTh1_2Api["onDetach"](motorPositionController);
        MotorControllerEventsTh1_2Api["onError"](motorPositionController);

        try { 
            //Open your Phidgets and wait for attachment
                await motorPositionController.open(5000);               
        } catch(err) { 
            console.log("Phidgets Networkserver - Channel open error:" + err);
            initilizeThL1(socketInstance, Th1Lever["positionCurrent"], Th1Lever["positionTarget"], Th1Lever["runMotor"]);
            //process.exit(1);
        }  
             
        //Do stuff with your Phidgets here or in your event handlers.
            doStuffTryCatch(motorPositionController.setKp(ControllerValuesApi.thL1_2["setKp"]), "setKp", socketInstance);
            doStuffTryCatch(motorPositionController.setKi(ControllerValuesApi.thL1_2["setKi"]), "setKi", socketInstance); 
            doStuffTryCatch(motorPositionController.setKd(ControllerValuesApi.thL1_2["setKd"]), "setKd", socketInstance);
            doStuffTryCatch(motorPositionController.setDeadBand(ControllerValuesApi.thL1_2["setDeadBand"]), "setDeadBand", socketInstance)
            doStuffTryCatch(motorPositionController.setAcceleration(ControllerValuesApi.thL1_2["setAcceleration"]), "setAcceleration", socketInstance)
            doStuffTryCatch(motorPositionController.setVelocityLimit(ControllerValuesApi.thL1_2["setVelocityLimit"]), "setTargetPosition", socketInstance)
            doStuffTryCatch(motorPositionController.setTargetPosition(positionTarget), "setTargetPosition", socketInstance)
            doStuffTryCatch(motorPositionController.setEngaged(runMotor), "setEngaged", socketInstance)
       
        //Do something with the positions value
            MotorControllerEventsTh1_2Api["onPositionChange"]("ThL1", socketInstance, motorPositionController);              
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
export default initilateThL1; 