// Import FlightSimulator modules 
    import phidget22 from "phidget22";
    import readMtuFuncPos from "../../../../../737MTUBackendControl/API/MTUFuncPosApi.js";

    import {inititlizeMTUInstances, mtuValuesApi, inititlizeMTUEventsApi} from'../../../../../737MTUBackendControl/API/InititlizeMTUApi.js';
import log from "node-gyp/lib/log.js";

var initilizeThL1 = async(positionCurrent, positionTarget, runMotor) => {
    // Initilize Functions classes from the API
        const motorPositionController = inititlizeMTUInstances.thL1_2["motorPositionController"]();

    //Set addressing parameters to specify which channel to open (if any)
        motorPositionController.setDeviceSerialNumber(668208);
        motorPositionController.setChannnel = 0;
        motorPositionController.setHubPort(0);

    //Assign any event handlers you need before calling open so that no events are missed.   
        inititlizeMTUEventsApi["onAttach"](motorPositionController);
        inititlizeMTUEventsApi["onDetach"](motorPositionController);
        inititlizeMTUEventsApi["onError"](motorPositionController);

        try { 
            //Open your Phidgets and wait for attachment
                await motorPositionController.open(5000);              
        } catch(err) {
            console.log("Phidgets Networkserver - Channel open error:" + err);
            initilizeThL1();
            //process.exit(1);
        }  
             
        //Do stuff with your Phidgets here or in your event handlers.
            doStuffTryCatch(motorPositionController.setKp(mtuValuesApi.thL1_2["setKp"]), "setKp");
            doStuffTryCatch(motorPositionController.setKi(mtuValuesApi.thL1_2["setKi"]), "setKi"); 
            doStuffTryCatch(motorPositionController.setKd(mtuValuesApi.thL1_2["setKd"]), "setKd");
            doStuffTryCatch(motorPositionController.setDeadBand(mtuValuesApi.thL1_2["setDeadBand"]), "setDeadBand")
            doStuffTryCatch(motorPositionController.setAcceleration(mtuValuesApi.thL1_2["setAcceleration"]), "setAcceleration")
            doStuffTryCatch(motorPositionController.setVelocityLimit(mtuValuesApi.thL1_2["setVelocityLimit"]), "setTargetPosition")
            doStuffTryCatch(motorPositionController.setTargetPosition(positionTarget), "setTargetPosition")
            doStuffTryCatch(motorPositionController.setEngaged(runMotor), "setEngaged")
       
        //Do something with the positions value
            inititlizeMTUEventsApi["onPositionChange"](motorPositionController);              

}

let doStuffTryCatch = async(whatToDo, errorMess) => {
    try {
        await whatToDo;
    } catch(err) {  
        console.error(`Error in sett ${errorMess} - ` + err);
    }
}
export default initilizeThL1;