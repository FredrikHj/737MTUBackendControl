import phidget22 from"phidget22";

const ControllerInstancesApi = {
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

export default ControllerInstancesApi;