const startByte="7f7f7f7f";
const endByte="7e7e7e7e";

 function incoming(Str){
    var data={
      sendDirection:"",
      typeOfData:"",
      frameLength:0,
      dataLength:0,
      MACAddress:"",
      bytecheck:"",
      endByte:"",
      startByte:"",
      CAN: new Array(0)
    }
      try {
        if (Str.substr(bytePos(1),bytenumber(4))==startByte){
          data.startByte=startByte;
          if(Str.substr(bytePos(5),bytenumber(1))=="01"){
              data.sendDirection = "Welder upload";
          }
            else if (Str.substr(bytePos(5),bytenumber(1))=="02") {
              data.sendDirection ="Welder download";
          }

          if (Str.substr(bytePos(6),bytenumber(4))=="00000000") {
              data.typeOfData = "Volt and Ampe data";
          }
          else if (Str.substr(bytePos(5),bytenumber(1))=="01000000") {
              data.typeOfData = "ID card data";
          }

          if (Str.substr(bytePos(10),bytenumber(2))=="5500"){
              data.frameLength =85;
          }
          else if (Str.substr(bytePos(10),bytenumber(2))=="4200") {
              data.frameLength =66;
          }

          data.MACAddress = Str.substr(bytePos(16),bytenumber(24));

          if (Str.substr(bytePos(40),bytenumber(2))=="1300"){
              data.dataLength = 19;

          }
          else if (Str.substr(bytePos(40),bytenumber(2))=="2600") {
              data.dataLength =38;
          }
          if (Str.substr(bytePos(42+data.dataLength+2),bytenumber(4))==endByte) {
            data.endByte = endByte;
          }else {
            return  console.log("data packet not fit frame");
          }
          CANFrame= Str.substr(bytePos(42),bytenumber(data.dataLength));
          if ( data.dataLength ==19) {
            data.CAN.push(CANParse(CANFrame));

          }else if (data.dataLength ==38) {
            data.CAN.push(CANParse(CANFrame));
            data.CAN.push(CANParse(CANFrame.substr(bytePos(20),bytenumber(38))));
          }
          data.bytecheck=Str.substr(bytePos(42+data.dataLength),bytenumber(2));
          return data;
        }
      }
      catch (e){
        console.log(e);
      }
}


function bytenumber(a){
    return a*2;
}
function bytePos(a){
  return  (a-1)*2;
}

function CANParse(data){
    var CANObject={
    CANstdId:"",
    CANextId:"",
    CANide:"",
    CANrtr:"",
    CANdlc:"",
    CANdata:new Object()
  }
  CANObject.CANstdId= data.substr(bytePos(1),bytenumber(4));
  CANObject.CANextId= data.substr(bytePos(5),bytenumber(4));
  CANObject.CANide= data.substr(bytePos(9),bytenumber(1));
  CANObject.CANrtr= data.substr(bytePos(10),bytenumber(1));
  CANObject.CANdlc= data.substr(bytePos(11),bytenumber(1));
  FrameNumber= data.substr(bytePos(12),bytenumber(1));

  switch (FrameNumber) {
    case "40":
    CANObject.CANdata.Frame="0x40: State control";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Alarm_information= parseInt(data.substr(bytePos(14),bytenumber(2)),16);
    CANObject.CANdata.Given_current=parseInt(data.substr(bytePos(16),bytenumber(2)),16);
    CANObject.CANdata.Given_voltage=parseInt(data.substr(bytePos(18),bytenumber(2)),16)/10;
    break;
    case "41":
    CANObject.CANdata.Frame="0x41: State control";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Wire_feeding_speed= parseInt(data.substr(bytePos(14),bytenumber(2)),16)/10;
    CANObject.CANdata.Actual_current=parseInt(data.substr(bytePos(16),bytenumber(2)),16);
    CANObject.CANdata.ACtual_Voltage=parseInt(data.substr(bytePos(18),bytenumber(2)),16)/10;
    break;
    case ("30"):
    CANObject.CANdata.Frame="0x31: Setting specification ";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Wire_Diameter = parseInt(data.substr(bytePos(14),bytenumber(1)),16);
    CANObject.CANdata.Material_Type =parseInt(data.substr(bytePos(15),bytenumber(1)),16);
    CANObject.CANdata.Control_Method = parseInt(data.substr(bytePos(16),bytenumber(1)),16);
    CANObject.CANdata.Operation_Control= parseInt(data.substr(bytePos(17),bytenumber(1)),16);
    CANObject.CANdata.Arc_Starting_Time = parseInt(data.substr(bytePos(18),bytenumber(1)),16);
    CANObject.CANdata.Arc_Time_Limit = parseInt(data.substr(bytePos(19),bytenumber(1)),16);
    break;
    case ("31"):
    CANObject.CANdata.Frame="0x31: Setting specification ";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Current_Center_Value = parseInt(data.substr(bytePos(14),bytenumber(2)),16);
    CANObject.CANdata.Current_Adjustment_Range =parseInt(data.substr(bytePos(16),bytenumber(1)),16);
    CANObject.CANdata.Voltage_Center_Value = parseInt(data.substr(bytePos(17),bytenumber(2)),16)/10;
    CANObject.CANdata.voltage_Trimming_Range = parseInt(data.substr(bytePos(19),bytenumber(1)),16)/10;
    break;
    case "20":
    CANObject.CANdata.Frame="0x20: View Specification Welder Reply ";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Wire_Diameter = parseInt(data.substr(bytePos(14),bytenumber(1)),16);
    CANObject.CANdata.Material_Type =parseInt(data.substr(bytePos(15),bytenumber(1)),16);
    CANObject.CANdata.Control_Method = parseInt(data.substr(bytePos(16),bytenumber(1)),16);
    CANObject.CANdata.Operation_Control= parseInt(data.substr(bytePos(17),bytenumber(1)),16);
    CANObject.CANdata.Arc_Starting_Time = parseInt(data.substr(bytePos(18),bytenumber(1)),16);
    CANObject.CANdata.Arc_Time_Limit = parseInt(data.substr(bytePos(19),bytenumber(1)),16);
    break;
    case "21":
    CANObject.CANdata.Frame="0x21: View Specification Welder Reply ";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Current_Center_Value = parseInt(data.substr(bytePos(14),bytenumber(2)),16);
    CANObject.CANdata.Current_Adjustment_Range =parseInt(data.substr(bytePos(16),bytenumber(1)),16);
    CANObject.CANdata.Voltage_Center_Value = parseInt(data.substr(bytePos(17),bytenumber(2)),16)/10;
    CANObject.CANdata.voltage_Trimming_Range = parseInt(data.substr(bytePos(19),bytenumber(1)),16)/10;
    break;
    case "2F":
    CANObject.CANdata.Frame="0x2F: erase specification ";
    CANObject.CANdata.Specification_Number= parseInt(data.substr(bytePos(13),bytenumber(1)),16);
    CANObject.CANdata.Operating_Status = parseInt(data.substr(bytePos(14),bytenumber(2)),16);
    break;
  }

  return CANObject;
}



module.exports={incoming};
