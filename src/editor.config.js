const fs = require('fs');


const promise = new Promise((resolve, reject) => {
  const content = `# http://editorconfig.org

  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  `;

  fs.writeFile('new.editorConfig', content, (err) => {
    if (err) {
      console.warn('.editor config not written!');
      reject();
    }

    resolve();

  });
});

const editorConfig = () => {
  return promise;
}

module.exports = editorConfig;
