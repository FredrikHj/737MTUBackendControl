// Import FlightSimulator modules 
import MtuConApi from "../MtuConApi.js"

const MotorControllerEventsTh1_2Api = {
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
    onPositionChange: (whichTHL, socketInstance, phidgetsInstance) => {
        return phidgetsInstance.onPositionChange = function(position) {
            console.log("Position: " + position);
            // If the client is connected
            MtuConApi.frontend["isConnected"] === true &&
                socketInstance.emit("motorControllerThL1", `Update ${whichTHL}`, {update: whichTHL, status: 200, possCurrent: position}, (response) => {
                    response.status === 200 && console.log("Value updates for Throttle 1 is in progress!");
                });
            //readMtuFuncPos.thL1 = position;       
        }
    }, 
    onError: (instance) => {
        return instance.onError = (code, description) => {
            console.log('Description: ' + description.toString());
            console.log('----------');  
        };
    },    
}  
export default MotorControllerEventsTh1_2Api;