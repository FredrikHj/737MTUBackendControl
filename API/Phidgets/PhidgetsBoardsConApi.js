// ConnectioAPI for PhidgetsConApi be 
let PhidgetsConApi = {
    rowHeadLines: [ 
        "Board Info:", "Device Spec:", 
        {
            boardInfo: ["Board Name", "Connection State"],
            deviceSpec: [ "Into Device", "Serial", "Device Port", "Channel"],
        },
    ],
    pBController: {
        boardName: "Parking Brake",
        isConnected: false,
        conMess: "Disconnected",
        isError: false,
        errorMess: "",
        conDevice: "",
        intoDevice: "",
        deviceSerialNr: 0,
        deviceHubPort: 0,
        deviceChannel: 0
    },
    sBController: {
        boardName: "Speed Brake",
        isConnected: false,
        conMess: "Disconnected",
        isError: false,
        errorMess: "",
        conDevice: "",
        deviceName: "",
        deviceSerialNr: 0,
        devicePort: 0,
        deviceChannel: 0
    },
    centerLevers: {
        tH1Controller: {
            boardName: "Thottle 1 - Lever",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },
        rev1Controller: {
            boardName: "Thottle 1 - Reverser",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },
        eng1Controller: {
            boardName: "Engine 1 - Start",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },    
        tH2Controller: {
            boardName: "Thottle 2 - Lever",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },
        rev2Controller: {
            boardName: "Thottle 2 - Reverser",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },
        eng2Controller: {
            boardName: "Engine 2 - Start",
            isConnected: false,
            conMess: "Disconnected",
            isError: false,
            errorMess: "",
            conDevice: "",
            deviceName: "",
            deviceSerialNr: 0,
            devicePort: 0,
            deviceChannel: 0
        },
    },
    flapsController: {
        boardName: "Flaps",
        isConnected: false,
        conMess: "Disconnected",
        isError: false,
        errorMess: "",
        conDevice: "",
        deviceName: "",
        deviceSerialNr: 0,
        devicePort: 0,
        deviceChannel: 0
    },
    digitalInputController: {
        boardName: "",
        isConnected: false,
        conMess: "Disconnected",
        isError: false,
        errorMess: "",
        conDevice: "",
        deviceName: "",
        deviceSerialNr: 0,
        devicePort: 0,
        deviceChannel: 0
    },
};
   
export default PhidgetsConApi;