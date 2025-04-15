// ConnectioAPIs to be sent for frontend
import PhidgetsBoardsConApi from"./Phidgets/PhidgetsBoardsConApi.js";
import MtuConApi from"./MtuConApi.js";

let ApiToBeSend = {
    MTUConParts: MtuConApi,
    servicesConParts: PhidgetsBoardsConApi
};
   
export default ApiToBeSend;