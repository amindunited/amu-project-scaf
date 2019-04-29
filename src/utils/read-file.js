const fs = require('fs');

const readFile = (filePath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {

        reject(err);
      }
      console.log('readFile resolving with: ', data);
      resolve(data);
    });
  });
  return promise;
}

module.exports = readFile;
