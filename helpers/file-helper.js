const fs = require('fs');
const path = require('path');
const config = require('../config');

let instance;
class FileHelper {

  async deleteFile(name) {
    return new Promise((resolve) => {
      const fPath = path.join(config.pictureDir, name);
      fs.unlink(fPath, (err) => {
        if (!err) {
          resolve(true);
        } else {
          console.error(err);
          resolve(false);
        }
      });
    });
  }

  async listFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(config.pictureDir, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      })
    });
  }

  async readFile(name) {
    return new Promise((resolve, reject) => {
      const fPath = path.join(config.pictureDir, name);
      fs.readFile(fPath, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

  async fileExists(name) {
    return new Promise((resolve) => {
      const fPath = path.join(config.pictureDir, name);
      fs.access(fPath, fs.constants.F_OK & fs.constants.R_OK, (err) => {
        if (!err) {
          resolve(true);
        } else {
          console.error(err);
          resolve(false);
        }
      });
    });
  }
}

module.exports = (() => {
  if (!instance) {
    instance = new FileHelper();
  }

  return instance;
})();
