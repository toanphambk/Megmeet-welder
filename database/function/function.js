// var {welderList}= require("./../collection/mongoConnect.js");
var {machineInfo}=require("./../model/machineInfo.js")
var {incoming}= require("./../../Comunication/parse.js");

function dataProcessing(msg,rinfo){
  var Data =incoming(msg.toString('hex'));
  console.log(JSON.stringify(Data,null,4));
  if (Data==undefined) {
    return console.log("dont care");
  }
  // machineInfo.findOne({macAdd:Data.MACAddress}).then((doc)=>{
  //   var date=new Date()
  //   console.log(date.toLocaleTimeString());
  //   console.log(date.toLocaleDateString());
  //   if (!doc) {
  //     console.log("New Welder");
  //     var NewMachine = new machineInfo({
  //       macAdd:Data.MACAddress,
  //       ipAdd:rinfo.address
  //     })
  //     NewMachine.save().then((newdoc)=>{
  //     return console.log("add done");
  //     })
  //   }else if (doc.ipAdd!=rinfo.address){
  //     doc.set({ipAdd : rinfo.address});
  //     doc.save().then((updatedDoc)=>{
  //     return console.log("changing ipadd");
  //     })
  //   }
  // }).catch((err)=>{
  // console.log('parse fail');
  // return console.log(err);
  // });
  var register
  // switch (Data.CAN[0].Frame) {
  //   case ('0x40: State control')
  //     register[
  //
  //
  //     ]
  // }
}




module.exports={dataProcessing}
