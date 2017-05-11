const exec = require('child_process').execSync;

const dependenciesToLink = ['react-native-pdf-view', 'react-native-fs'];

const command = 'react-native link';

dependenciesToLink.forEach((dependency) => {
  exec(`${command} ${dependency}`);
});
