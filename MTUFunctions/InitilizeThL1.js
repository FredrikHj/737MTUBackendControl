// Import FlightSimulator modules 
    import phidget22, { BLDCMotor }  from 'phidget22';
    import {mtuValuesApi, readMtuFuncPos} from'../InititlizeMTUApi.js';

var initilizeThL1 = async(positionCurrent, positionTarget, runMotor) => {
    phidget22.Log.enable(phidget22.LogLevel.INFO);
    // Initilize Functions classes from the API
        const bldcPoss0 = new phidget22.MotorPositionController();

    //Set addressing parameters to specify which channel to open (if any)
        bldcPoss0.setDeviceSerialNumber(668208);
        bldcPoss0.setChannnel = 0;
        bldcPoss0.setHubPort(0);

    //Assign any event handlers you need before calling open so that no events are missed.   
    bldcPoss0.onAttach  = () => {
        console.log('onAttach !');

    }; 
        bldcPoss0.onDetach = () => {
            console.log('Dettach!');
        };
        bldcPoss0.onError = (code, description) => {
            console.log('Description: ' + description.toString());
            console.log('----------');  
        };
        //Open your Phidgets and wait for attachment
            const openPromiseList = [];
            openPromiseList.push(bldcPoss0.open(2000)); 
            
            try { 
                await Promise.all(openPromiseList);
            } catch(err) {
                console.log("Phidgets Networkserver - Connection Error:" + err);
                process.exit(1);
            }  
            
        //Do stuff with your Phidgets here or in your event handlers.
            doStuffTryCatch(bldcPoss0.setKp(mtuValuesApi.thL1_2["setKp"]), "setKp");
            doStuffTryCatch(bldcPoss0.setKi(mtuValuesApi.thL1_2["setKi"]), "setKi");
            doStuffTryCatch(bldcPoss0.setKd(mtuValuesApi.thL1_2["setKd"]), "setKd");
            doStuffTryCatch(bldcPoss0.setDeadBand(mtuValuesApi.thL1_2["setDeadBand"]), "setDeadBand")
            doStuffTryCatch(bldcPoss0.setAcceleration(mtuValuesApi.thL1_2["setAcceleration"]), "setAcceleration")
            doStuffTryCatch(bldcPoss0.setVelocityLimit(mtuValuesApi.thL1_2["setVelocityLimit"]), "setTargetPosition")
            doStuffTryCatch(bldcPoss0.setTargetPosition(positionTarget), "setTargetPosition")
            doStuffTryCatch(bldcPoss0.setEngaged(runMotor), "setEngaged")
       
        //Do something with the positions value
            bldcPoss0.onPositionChange = function(position) {
                console.log("Position: " + position);
                readMtuFuncPos.thL1 = position;
            }
}

let doStuffTryCatch = async(whatToDo, errorMess) => {
    try {
        await whatToDo;
    } catch(err) {  
        console.error(`Error in sett ${errorMess} - ` + err);
        process.exit(1);
    }
}
export default initilizeThL1;