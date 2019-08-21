const wdio = require('webdriverio');
const opts = {
  port: 4723,
  capabilities: {
    platformName: 'Android',
    activity: 'com.kiwitraffic.MainActivity',
    deviceName: 'Android Emulator',
    app: 'com.kiwitraffic'
  }
};

const client = wdio.remote(opts);
