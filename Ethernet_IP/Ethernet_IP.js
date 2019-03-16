const { Controller } = require("ethernet-ip");

const PLC = new Controller();

// Controller.connect(IP_ADDR[, SLOT])
// NOTE: SLOT = 0 (default) - 0 if CompactLogix
PLC.connect("192.168.1.1", 0).then(() => {
    console.log(PLC.properties);
});
