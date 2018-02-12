const Api = require('./api.js');

// *** TO DO - get from settings
var apiDta = {
	"jwt": "<token>",
	"installId": "E629CCCC-A9E0-40F1-8BB8-43A24830346B",
	"keaseApiKey": "14445b6a2dba"
};

var api = new Api(apiDta);

async function getFirmwareKeys() {
  try{
    var locks = await api.getLocks();
    var lockIds = Object.keys(locks);

    for (var i = 0; i < lockIds.length; i++) {
      var l = locks[lockIds[i]];
      try {
        var firmware = await api.getTiFirmware(lockIds[i], '1.1.20');
        var extraDataStart = firmware.length - 68;
        var serialNumber = firmware.toString('ascii', extraDataStart, extraDataStart + 10);
        var readLockId = firmware.toString('hex', extraDataStart + 16, extraDataStart + 32);
        var firmwareKey = firmware.toString('hex', extraDataStart + 48, extraDataStart + 64);
		  
		// *** TO DO - deal with data, don't log
        console.log(l);
        console.log('sn: '+ serialNumber);
        console.log('id: '+ readLockId);
        console.log('key: '+ firmwareKey);
      } catch(e){
        console.log("Could not get key for " + l)
      }
    }
  } catch(e) {
    console.log(e);
  }
}

getFirmwareKeys();
