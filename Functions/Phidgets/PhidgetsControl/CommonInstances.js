var CommonInstances = {
    powerGuard: {
        powerGuardController: () => {return new phidget22.PowerGuard();},
        voltageInputController: () => {return new phidget22.VoltageInput();},
        temperatureSensoController: () => {return new phidget22.TemperatureSensor();},
    },
}
export default CommonInstances;