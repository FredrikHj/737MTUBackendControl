import phidget22 from "phidget22";

var CenterLeversInstances = {
    thLevers: {
        bldcController: () => {return new phidget22.BLDCMotor();},
        positionController: () => {return new phidget22.MotorPositionController();},
        temperatureSensorController: () => {return new phidget22.TemperatureSensor();},
    },
    revLevers: {
        voltageRatioInputController: () => {return new phidget22.VoltageRatioInput();},
        voltageInputController: () => {return new phidget22.VoltageInput();},
    },
    engLevers: {
        voltageRatioInputController: () => {return new phidget22.VoltageRatioInput();},
        voltageInputController: () => {return new phidget22.VoltageInput();},
    },
}
export default CenterLeversInstances;