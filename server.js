var {dataProcessing}=require(__dirname+"/database/function/function.js")
var {command}=require(__dirname+"/Comunication/frame_render.js")
var dgram = require('dgram');
var server = dgram.createSocket('udp4');


server.on('error', (err) => {
  console.log(`server error:\n ${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  var machineIP="";
  // dataProcessing(msg,rinfo)
  // server.close()
  console.log(rinfo b);
});

server.bind(3005,"192.168.0.16",()=>{
  console.log('server is listen on port 3005');
});
