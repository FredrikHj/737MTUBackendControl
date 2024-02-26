// Import FlightSimulator modules 
import phidget22 from "phidget22";
import readMtuFuncPos from "./MTUFuncPosApi.js"

export const inititlizeMTUInstances = {
    enginesCutOff: {

    },
    thL1_2: {
        motorPositionController: () => {return new phidget22.MotorPositionController();},
    },
    thL1_2Rev: {

    },
    flaps: {

    },
    speedBrake: {

    },
    parkingBrake: {

    },
}
export const inititlizeMTUEventsApi = {
    onAttach: (instance) => {
        return instance.onAttach  = () => {
            console.log(instance + 'is onAttach !');
        };
    },
    onDetach: (instance) => {
        return instance.onDetach = () => {
            console.log(instance + ' is Dettach!');
        };
    },
    onPositionChange: (instance) => {
        return instance.onPositionChange = function(position) {
            console.log("Position: " + position);
            readMtuFuncPos.thL1 = position;       
        }
    },
    onError: (instance) => {
        return instance.onError = (code, description) => {
            console.log('Description: ' + description.toString());
            console.log('----------');  
        };
    },    
} 

export const mtuValuesApi = {
    enginesCutOff: {

    },
    thL1_2: {
        setKp: -9000.0,
        setKi: -100.0,
        setKd: -100.0,
        setDeadBand: 0,
        setAcceleration: 100000,
        setVelocityLimit: 150,
    },
    thL1_2Rev: {

    },
    flaps: {

    },
    speedBrake: {

    },
    parkingBrake: {

    },
}