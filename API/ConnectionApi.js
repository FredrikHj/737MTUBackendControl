// ConnectioAPI to be sent for frontend later
let  ConnectionApi = {
    backend: {
        serverMess: "Connected",
        isConnected: true,
        isError: false,
        log: "",
        status: 0
    },
    phidgets: {
        serverMess: "",
        isConnected: false,
        isError: false,
        log: "",
        status: 0
    },
    fsuipc: {
        serverMess: "",
        isConnected: false,
        isError: false,
        log: "",
        status: 0
    }
};
   
export default ConnectionApi;