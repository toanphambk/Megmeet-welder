
var dgram = require('dgram');
const { weldingDataParse } = require('./Comunication/parse');

var server = dgram.createSocket('udp4');


server.on('error', (err) => {
  console.log(`server error:\n ${err.stack}`);
  server.close();
});
var a = new Array()
server.on('message', (msg, rinfo) => {
  let data = weldingDataParse(msg)
  if(!a.includes(data.MACAddress)){
    a.push(data.MACAddress)
    console.log(a);
    
  }
  
});

server.bind(3005, "192.168.0.198", () => {
  console.log('server is listen on port 3005');
});


// {
//  "sendDirection": "Welder upload",
//  "typeOfData": "Volt and Ampe data",
//  "frameLength": 85,
//  "dataLength": 38,
//  "MACAddress": "343044363343304139453342343044363343304139453343",
//  "bytecheck": "0000",
//  "endByte": "7e7e7e7e",
//  "startByte": "7f7f7f7f",
//  "CAN": [
//  {
//  "CANstdId": "14070000",
//  "CANextId": "00000000",
//  "CANide": "00",
//  "CANrtr": "00",
//  "CANdlc": "08",
//  "CANdata": {
//  "Frame": "0x40: State control",
//  "Specification_Number": 255,
//  "Alarm_information": 0,
//  "Given_current": 215,
//  "Given_voltage": 28.5
//  }
//  ,
//  {
//  "CANstdId": "14070000",
//  "CANextId": "00000000",
//  "CANide": "00",
//  "CANrtr": "00",
//  "CANdlc": "08",
//  "CANdata": {
//  "Frame": "0x41: State control",
//  "Specification_Number": 255,
//  "Wire_feeding_speed": 0,
//  "Actual_current": 0,
//  "ACtual_Voltage": 0
//  }
//  ]
// }
