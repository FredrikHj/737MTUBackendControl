 import initilateThL1 from'./CenterLevers/Th1_2/InitilizeThL1.js';
import MtuConApi from "../../../API/MtuConApi.js";

var HeadController = () => {
    console.log("Head Controller for the MTU!");
    // Check if Phidgets Server in connected
    console.log("Is Phidgets Connected ", MtuConApi.phidgets["isConnected"]);
    MtuConApi.phidgets["isConnected"] === true &&
        console.log("fgre");
        
    
    //initilateThL1(instance, Th1Lever["positionCurrent"], Th1Lever["positionTarget"], Th1Lever["runMotor"]);     


}
export default HeadController;