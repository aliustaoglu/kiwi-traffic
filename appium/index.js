const wdio = require('webdriverio');
const opts = {
  port: 4723,
  capabilities: {
    platformName: 'iOS',
    platformVersion: '12.2',
    deviceName: 'iPhone 6s Plus',
    //app: '/Users/cuneytaliustaoglu/Library/Developer/Xcode/DerivedData/kiwiTraffic-byragdztxiwrkqbgekqbnmowichn/Build/Products/Release-iphonesimulator/kiwiTraffic.app'
    app: '/Builds/ios/kiwiTraffic/Release-iphoneos/kiwiTraffic.app'
  }
};

const client = wdio.remote(opts);
