const fs = require('fs');

const fileWritter = (fileName, content) => {

  const promise = new Promise((resolve, reject) => {

    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.warn(`File: ${fileName}, not written`);
        reject();
      }

      resolve();

    });
  });

  return promise;
}

module.exports = fileWritter;
