const STARTBYTE = "7f7f7f7f";
const ENDBYTE = "7e7e7e7e";;

function weldingDataParse(package) {
  _package = package.toString('hex')
  var data = {
    MACAddress: "",
    CAN: new Object();
  }
  try {
    if (_package.substr(bytePos(40), bytenumber(2)) == "1300") {
      data.dataLength = 19;
    } else if (_package.substr(bytePos(40), bytenumber(2)) == "2600") {
      data.dataLength = 38;
    } else {
      throw "invalid data length"
    }

    if (!_package.substr(bytePos(42 + data.dataLength + 2), bytenumber(4)) == ENDBYTE && _package.substr(bytePos(1), bytenumber(4)) == STARTBYTE) {
      throw "data packet not fit frame"
    } else {
 
      CANFrame = _package.substr(bytePos(42), bytenumber(data.dataLength));
      data.MACAddress = _package.substr(bytePos(16), bytenumber(24));
      if (data.dataLength == 19) {
        data.CAN=(CANParse(CANFrame));
      } else if (data.dataLength == 38) {
        data.CAN={
          ...CANParse(CANFrame),
          ...CANParse(CANFrame.substr(bytePos(20), bytenumber(38)))
        }

      }
      return data;
    }
  }
  catch (e) {
    console.log(e);
  }
}


function bytenumber(a) {
  return a * 2;
}
function bytePos(a) {
  return (a - 1) * 2;
}

function CANParse(data) {
  var CANdata = new Object()
  FrameNumber = data.substr(bytePos(12), bytenumber(1));

  switch (FrameNumber) {
    case "40":
      CANdata.alarm_information = parseInt(data.substr(bytePos(14), bytenumber(2)), 16);
      CANdata.given_current = parseInt(data.substr(bytePos(16), bytenumber(2)), 16);
      CANdata.given_voltage = parseInt(data.substr(bytePos(18), bytenumber(2)), 16) / 10;
      break;
    case "41":
      CANdata.wire_feeding_speed = parseInt(data.substr(bytePos(14), bytenumber(2)), 16) / 10;
      CANdata.actual_current = parseInt(data.substr(bytePos(16), bytenumber(2)), 16);
      CANdata.actual_Voltage = parseInt(data.substr(bytePos(18), bytenumber(2)), 16) / 10;
      break;
    case "30":
      CANdata.Frame = "0x31: Setting specification ";
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Wire_Diameter = parseInt(data.substr(bytePos(14), bytenumber(1)), 16);
      CANdata.Material_Type = parseInt(data.substr(bytePos(15), bytenumber(1)), 16);
      CANdata.Control_Method = parseInt(data.substr(bytePos(16), bytenumber(1)), 16);
      CANdata.Operation_Control = parseInt(data.substr(bytePos(17), bytenumber(1)), 16);
      CANdata.Arc_Starting_Time = parseInt(data.substr(bytePos(18), bytenumber(1)), 16);
      CANdata.Arc_Time_Limit = parseInt(data.substr(bytePos(19), bytenumber(1)), 16);
      break;
    case "31":
      CANdata.Frame = "0x31: Setting specification";
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Current_Center_Value = parseInt(data.substr(bytePos(14), bytenumber(2)), 16);
      CANdata.Current_Adjustment_Range = parseInt(data.substr(bytePos(16), bytenumber(1)), 16);
      CANdata.Voltage_Center_Value = parseInt(data.substr(bytePos(17), bytenumber(2)), 16) / 10;
      CANdata.voltage_Trimming_Range = parseInt(data.substr(bytePos(19), bytenumber(1)), 16) / 10;
      break;
    case "20":
      CANdata.Frame = "0x20: View Specification Welder Reply ";
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Wire_Diameter = parseInt(data.substr(bytePos(14), bytenumber(1)), 16);
      CANdata.Material_Type = parseInt(data.substr(bytePos(15), bytenumber(1)), 16);
      CANdata.Control_Method = parseInt(data.substr(bytePos(16), bytenumber(1)), 16);
      CANdata.Operation_Control = parseInt(data.substr(bytePos(17), bytenumber(1)), 16);
      CANdata.Arc_Starting_Time = parseInt(data.substr(bytePos(18), bytenumber(1)), 16);
      CANdata.Arc_Time_Limit = parseInt(data.substr(bytePos(19), bytenumber(1)), 16);
      break;
    case "21":
      CANdata.Frame = "0x21: View Specification Welder Reply ";
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Current_Center_Value = parseInt(data.substr(bytePos(14), bytenumber(2)), 16);
      CANdata.Current_Adjustment_Range = parseInt(data.substr(bytePos(16), bytenumber(1)), 16);
      CANdata.Voltage_Center_Value = parseInt(data.substr(bytePos(17), bytenumber(2)), 16) / 10;
      CANdata.voltage_Trimming_Range = parseInt(data.substr(bytePos(19), bytenumber(1)), 16) / 10;
      break;
    case "2F":
      CANdata.Frame = "0x2F: erase specification ";
      CANdata.Specification_Number = parseInt(data.substr(bytePos(13), bytenumber(1)), 16);
      CANdata.Operating_Status = parseInt(data.substr(bytePos(14), bytenumber(2)), 16);
      break;
  }
  return CANdata;
}


module.exports = { weldingDataParse };
