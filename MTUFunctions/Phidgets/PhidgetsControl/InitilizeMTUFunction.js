import { initializeStore } from "../../../store";
import { setServicesConnected } from "../../../redux/ThrottleReadySlicer";
import {AvailabilityOfFSIPCInstance$} from "../../FSUIPC/AvailabilityFSUIPCInstance";
import initilizeThL1 from'./ThrottleFunctions/InitilizeThL1.js';

var serviceConnected = false;

// Recusive function for check if service is 
//var isServicesConnected = () => { 
    
var InitilizeMTUFunction = () => {   
    var test = AvailabilityOfFSIPCInstance$;  
    console.log('test :', test);
    //Check services connection
        var initializeStoreState = initializeStore.getState();
        var isFsuipcConnected = initializeStoreState.serviceFSUIPC["connected"];
        var isPhidgetsConnected = initializeStoreState.servicePHIDGETS["connected"];
    
    // Sett if all services are connected
    initializeStore.dispatch(setServicesConnected(true));

    console.log("FSUIPC Connnected? - "+ isFsuipcConnected);
    console.log("Phidgets Connected? - "+ isPhidgetsConnected);

    if(isPhidgetsConnected === true) {
        console.log("Ready to InitilizeMTUFunctions");
        //initilizeThL1(0, 2500, true); 
    }
}
export default InitilizeMTUFunction;