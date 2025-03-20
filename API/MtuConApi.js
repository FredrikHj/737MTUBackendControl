// ConnectioAPI to be sent for frontend later
let  MtuConApi = {
    backend: {
        serverAddress: "localhost",
        port: 3001,
        serverMess: "Connected", //Showing that the MTUServer is conncected in the MTUViewer
        isConnected: true,
        isError: false,
        log: "",
        serverAcknowledgements: 200,
        serverClientConId: "",
    },
    frontend: {
        clientMess: "disconnected",
        isConnected: false,
    },
    phidgets: {
        serverHostname: "fredrikhjipnr.freddansitaccess.se",        
        isConnected: false,
        isError: false,
        serverMess: "",
        serverPort: 5661, 
        conLost: false,
        conLostMess: "",

        log: "",
        status: 0
    },
    fsuipc: {
        serverMess: "",
        isConnected: false,
        isError: false,
        conLost: false,
        conLostMess: "",
        log: "",
        status: 0
    }
};
   
export default MtuConApi;