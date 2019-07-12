const fs = require('fs');

/**
 * Get Available Project Templates
 */
const getAvailableProjectTemplates = (templateSource) => {
  return new Promise((resolve, reject) => {
    // If it's a URL we'll have to load the JSON
    if (templateSource.match(/^http/)) {}
    else {
      // read directory
      fs.readdir(templateSource, (err, dir) => {
        if (err) { reject(err); return; }
        resolve(dir);
      })
    }
  });
}

module.exports = getAvailableProjectTemplates;
