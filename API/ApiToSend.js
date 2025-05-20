// ConnectioAPIs to be sent for frontend
import PhidgetsBoardsConApi from"../Functions/Phidgets/PhidgetsControl/Phidgets_ControllerBoardsApi.js";
import MtuConApi from"./MtuConApi.js";

let ApiToBeSend = {
    MTUConParts: MtuConApi,
    servicesConParts: PhidgetsBoardsConApi
};
   
export default ApiToBeSend;