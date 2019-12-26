const fs = require('fs');
const path = require('path');


class Logger {
  constructor(logSavePath, logName) {
    this.logSavePath = logSavePath;
    this.logName = logName;
    this.path = path.join(logSavePath, logName + '.txt');

    try {
      // Check existence of dir
      if (!fs.existsSync(logSavePath)) {
        fs.mkdirSync(logSavePath);
      }

      // Check existence of file
      if (!fs.existsSync(this.path)) {
        console.log('Creating new log file');
        let fd = fs.createWriteStream(this.path);
        fd.close();
      }

      let currDate = new Date(Date.now());
      let timeStamp = currDate.toTimeString();
      let dateStamp = currDate.toDateString();
      fs.appendFile(this.path, '\nLog Started ' + dateStamp + ' ' + timeStamp, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      if (err) throw err;
    }
  }

  log(message) {
    let timeStamp = (new Date(Date.now())).toTimeString();
    fs.appendFile(this.path, '\n' + timeStamp + '\n' + message, (err) => {
      if (err) throw err;
    });
  }

  // Log to file and log to console
  logp(message) {
    console.log(message);
    this.log(message);
  }
}

module.exports.Logger = Logger;
