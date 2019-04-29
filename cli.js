#!/usr/bin/env node
const chalk = require('chalk');
// const readline = require('readline');
// const Choices = require('prompt-choices');
const inquirer = require('inquirer');

const licences = require('./src/licences');
const npmLogin = require('./src/npm-login');

console.log(chalk.blue('////////////////////////////////////'));
console.log(chalk.blue('// AMU') + ' Project' + chalk.red(' Scaffolding'));
console.log(chalk.blue('////////////////////////////////////'));

console.log(chalk.yellow('working directory is ', process.cwd()));

console.log(chalk.blue('args ', process.argv));

/**
 * todos
 * [✓] Project Name
 * [ ] NPM Login Details
 * [ ] NPM Scope
 * [ ] Packaging Library
 * [ ] Unit Testing Lib
 * [ ] E2E Testing Lib
 * [✓] CI
 * [ ] Description
 * [✓] Get author name
 * [✓] License
 */

 /* // NPM Questions
 * name: (project-name) project-name
 * version: (0.0.0) 0.0.1 // auto
 * description: The Project Description
 * entry point: //leave empty // auto to index.js
 * test command: //leave empty // auto when testing framework chosen
 * git repository: //the repositories url // auto if .git exists
 * keywords: //leave empty //
 * author: // your name
 * license: N/A
 */

const projectNameQuestion = {
  type: 'input',
  name: 'projectName',
  message: 'What is the project\'s name?'
}

const projectAuthorQuestion = {
  type: 'input',
  name: 'authorName',
  message: 'What is the author\'s full name?'
}

const emailQuestion = {
  type: 'input',
  name: 'email',
  message: 'What is your email [must be the same as your NPM email]?'
}

const npmLoginQuestion = {
  type: 'input',
  name: 'npmLogin',
  message: 'What is your NPM login?'
}

const npmPasswordQuestion = {
  type: 'password',
  name: 'npmPassword',
  message: 'What is your NPM password?'
}

const CIs = [{
    name: 'circleCI',
    value: 'Circle CI'
  }, {
    name: 'Gitlab',
    value: 'Gitlab CI'
  }, {
    name: 'Travis',
    value: 'Travis CI'
}]

const ciQuestions = {
  type: 'rawlist',
  name: 'ci',
  message: 'Which CI would you like to use?',
  choices: CIs
};

const questions = [
  projectNameQuestion,
  projectAuthorQuestion,
  emailQuestion,
  npmLoginQuestion,
  npmPasswordQuestion,
  licences.licenceQuestions,
  ciQuestions
];
inquirer.prompt(questions).then(async (answers) => {
  console.log('\nLicence:');
  console.log(JSON.stringify(answers, null, '  '));

  await licences.createLicence(answers.licence);
  npmLogin.login(answers.npmLogin, answers.npmPassword, answers.email);

  console.log('Done');
});

