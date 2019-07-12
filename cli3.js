#!/usr/bin/env node
const chalk = require('chalk');
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const recusiveReadDirectory = require('@amindunited/recursive-read-directory');
const readFile = require('@amindunited/read-file');
const fs = require('fs');
const ensurePath = require('./src/utils/ensure-path');

console.log(chalk.blue('////////////////////////////////////'));
console.log(chalk.blue('// Scaff') + chalk.red(' It'));
console.log(chalk.blue('////////////////////////////////////'));

let userConfig = {};
let projectTemplates = './mock_src/project-templates/';
let projectDirectory = 'vanilla-js';

const useLocalTemplatesPrompt = () => {

  const questions = {
    type: 'confirm',
    name: 'useLocalTemplates',
    message: 'Would you like to use local project templates?'
  };
  return inquirer.prompt(questions).then(async (answers) => {
    console.log('Use local templates ', answers);
    userConfig = Object.assign({}, userConfig, answers);
    return answers;
  });
};

const getListOfProjectTemplates = () => {
  //
  // return recusiveReadDirectory('./mock_src/project-templates/vanilla-js')
  fs.readdir('./mock_src/project-templates/',  (err, data) => {
    if (err) {
      return;
    }
    console.log('templates', data);
  });
  return [];
}

useLocalTemplatesPrompt()
  .then(getListOfProjectTemplates)
  .then((data) => {
    console.log('data', data);
    data.forEach((template) => {

      console.log('loading template', template);
    });
  });
  // .then((data) => {
  //   console.log('....', data);
  //   data.forEach((datum) => {
  //     const path = datum
  //       .replace(projectTemplates, '')
  //       .replace(projectDirectory, '')
  //       .replace('/files/', '');
  //     readFile(datum).then((content) => {
  //       console.log('content ', content);
  //     });
  //     console.log('datum ', path);
  //   });
  //   console.log('Final answers ', userConfig);
  // });
