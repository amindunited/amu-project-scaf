const recursiveReadDir = require ('@amindunited/recursive-read-directory');

const srcDirPath = './mock_src/project-templates';

console.log('recursive read ', recursiveReadDir);

recursiveReadDir(srcDirPath)
  .then((files) => {
    console.log('files:', files);
  });
