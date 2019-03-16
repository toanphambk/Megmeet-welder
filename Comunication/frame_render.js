function command(hostIP,macAddress,data1,data2 = ""){
  var  frameLength;
  var  dataLength;
  const startByte="7f7f7f7f";
  const sendDirection="02"
  const endByte="7e7e7e7e";
  const typeOfData="00000000"
  if (data2!="") {
  frameLength="5500";
  dataLength="2600";
  }
  else {
    frameLength="4200";
    dataLength="1300";
  }
  const canStartbyte= "1405000000000000000008";
  const canEndFbyte="0000";
  // console.log(startByte+sendDirection+typeOfData+frameLength+hostIP+macAddress+dataLength+canStartbyte+data1+data2+canEndFbyte+endByte);
  return String (startByte+sendDirection+typeOfData+frameLength+hostIP+macAddress+dataLength+canStartbyte+data1+data2+canEndFbyte+endByte);
}

module.exports={command}
