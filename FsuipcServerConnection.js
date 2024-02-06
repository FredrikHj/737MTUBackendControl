// Import FlightSimulator modules 
const fsuipc = require('fsuipc');

const obj = new fsuipc.FSUIPC();

// Recusive function for check if service is 
//var isServicesConnected = () => { 
    
var fsuipcServerConnection = () => {
    obj.open()
    .then((obj) => {
      console.log(obj.add('clockHour', 0x238, fsuipc.Type.Byte));
      console.log(obj.add('aircraftType', 0x3D00, fsuipc.Type.String, 256));
      console.log(obj.add('lights', 0x0D0C, fsuipc.Type.BitArray, 2));

      return obj.process();
    })
    .then((result) => {
      console.log(JSON.stringify(result));

      return obj.close();
    })
    .catch((err) => {
      console.error(err);
      
      return obj.close();
    });
 
}
export default fsuipcServerConnection;