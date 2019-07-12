const fs = require('fs');

const readProjectConfig = (projectPath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(`${projectPath}/config.json`, 'utf8', (err, config) => {
      if (err) { reject(err); return; }
      resolve(JSON.parse(config));
    })
  });
  return promise;
}
module.exports = readProjectConfig;
