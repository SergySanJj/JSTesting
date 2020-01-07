export {};

const fs = require('fs');
const path = require('path');


class Logger {
  private logSavePath: string;
  private logName: string;
  private path: string;

  constructor(logSavePath: string, logName: string) {
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
        // console.log('Creating new log file at ' + this.path);
        const fd = fs.createWriteStream(this.path);
        fd.close();
      }

      const currDate = new Date(Date.now());
      const timeStamp = currDate.toTimeString();
      const dateStamp = currDate.toDateString();
      fs.appendFile(this.path, '\nLog Started ' + dateStamp + ' ' + timeStamp, (err) => {
        if (err) {
          throw err;
        }
      });
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }

  public record(message) {
    const timeStamp = (new Date(Date.now())).toTimeString();
    fs.appendFile(this.path, '\n' + timeStamp + '\n' + message, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  // Log to file and log to console
  logp(message) {
    console.log(message);
    this.record(message);
  }
}

module.exports.Logger = Logger;
