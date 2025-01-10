// ConnectioAPI to be sent for frontend later
let  ConnectionApi = {
    backend: {
        serverMess: "Connected",
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
        serverHostname: "hub5000.local",
        serverPort: 5661, 
        serverName: "Phidget Server Connection",
        serverMess: "",
        isConnected: false,
        isError: false,
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
   
export default ConnectionApi;