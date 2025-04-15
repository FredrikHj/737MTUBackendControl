import initPBController from'./ParkingBrake/InitPBController.js';
import MtuConApi from "../../../API/MtuConApi.js";

var HeadController = (instance, boardControllValues) => {
    console.log("Head Controller for the MTU!");
    // Check if Phidgets Server in connected
    console.log("Is Phidgets Connected ", MtuConApi.phidgets["isConnected"]);
    MtuConApi.phidgets["isConnected"] === true &&
        // Initiante the Parking Brake conroller
            initPBController(
                instance,
                boardControllValues.th1Lever["positionCurrent"],
                boardControllValues.th1Lever["positionTarget"],
                boardControllValues.th1Lever["runMotor"]
            );
}
export default HeadController;