const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

class Log {
  info(message) {
    // eslint-disable-next-line no-console
    console.log(chalk.green(`${message}`));
  }
  success(message) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`${message}`));
  }
  error(message) {
    // eslint-disable-next-line no-console
    console.log(chalk.red(`${message}`));
  }
}

class File {
  resolve(...file) {
    return path.resolve(__dirname, ...file);
  }
  toLower(s) {
    let str = s.replace(/([A-Z])/g, "-$1").toLowerCase();
    return str.startsWith("-") ? str.substr(1, str.length) : str;
  }
  dirname(dir) {
    return path.dirname(dir);
  }
  creat(path, data) {
    /**
     * 创建文件
     */
    if (this.exist(path)) {
      Log.error(`${path}文件已存在`);
      return;
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, "utf8", err => {
        if (err) {
          Log.error(err.message);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
  exist(directory) {
    /**
     * 文件是否存在
     */
    return fs.existsSync(directory);
  }
  mkdir(directory) {
    /**
     * 创建目录
     */
    function mkdirs(directory, callback) {
      const exists = fs.existsSync(directory);
      if (exists) {
        callback();
      } else {
        mkdirs(path.dirname(directory), function() {
          fs.mkdirSync(directory);
          callback();
        });
      }
    }
    return new Promise(resolve => {
      mkdirs(directory, function() {
        resolve(true);
      });
    });
  }
}

module.exports = {
  Log,
  File
};
