#!/usr/bin/env node
const chalk = require('chalk');
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const fs = require('fs');
const ensurePath = require('./src/utils/ensure-path');

console.log(chalk.blue('////////////////////////////////////'));
console.log(chalk.blue('// AMU') + ' Project' + chalk.red(' Scaffolding'));
console.log(chalk.blue('////////////////////////////////////'));

console.log(chalk.yellow('working directory is ', process.cwd()));

console.log(chalk.blue('args ', process.argv));

let templateListURL = 'https://raw.githubusercontent.com/amindunited/amu-project-scaf/master/dist/templates/';
let templateSource = 'https://raw.githubusercontent.com/amindunited/amu-project-scaf/master/dist/templates/node-package/';
let templateConfig;

const getTemplateList = () => {
  return fetch(`${templateListURL}config.json`)
    .then((blob) => {
      return blob.json();
    })
    .then((data) => data);
};

getTemplateList()
  .then((list) => { console.log('got the template list ', list); },
    (err) => { console.error(err); }
  );


/**
 * The Code Below works now, but is not called ... Yet
 */
const getTemplateConfig = () => {
  return fetch(`${templateSource}config.json`)
  .then((blob) => {
    return blob.json();
  })
  .then((data) => {
    console.log(chalk.green('got the data! '), data);
    templateConfig = data;
    writeTemplates({}, templateConfig)
    .then(() => {
      console.log('done writting templates');
    }, (err) => {
      console.error('error writting templates');
    });
  });
}

const getTemplate = (url) => {
  console.log('getTemplate', url);
  return fetch(url)
  .then((blob) => blob.text() )
  .then(content => content);
}

const writeTemplates = (data, templateConfig) => {
  return new Promise((resolve, reject) => {
    const templatePromises = [];
    console.log('for each ', templateConfig);
    templateConfig.templates.forEach(template => {
      const url = `${templateSource}${template.url}`;
      templatePromises.push(getTemplate(url).then((templateContent) => {
        const TEMPDIR = template.dest.replace(/^.\//, './testing/');
        return writeTemplate(`${TEMPDIR}${template.name}`, templateContent);
      }));
    });
    return Promise.all(templatePromises);
  });
}

const writeTemplate = (path, content) => {
  return new Promise((resolve, reject) => {
    console.log('write file ', path);
    ensurePath(path.substring(0, path.lastIndexOf("/"))).then(() =>
      fs.writeFile(path, content, (err) => {
        if (!err) {
          resolve();
          return;
        }

        console.error('error writting', err);

      })
      // resolve()
    );
  });
}
