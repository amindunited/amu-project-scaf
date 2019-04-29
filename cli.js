#!/usr/bin/env node
const chalk = require('chalk');
const readline = require('readline');
const Choices = require('prompt-choices');
var inquirer = require('inquirer');

console.log(chalk.blue('////////////////////////////////////'));
console.log(chalk.blue('// AMU') + ' Project' + chalk.red(' Scaffolding'));
console.log(chalk.blue('////////////////////////////////////'));

console.log(chalk.yellow('working directory is ', process.cwd()));

console.log(chalk.blue('args ', process.argv));

const licences = [
  {
    name: 'MIT',
    value: 'mit'
  },
  {
    name: 'BSD 3',
    value: 'BSD-3-Clause'
  }
];

const licenceQuestions = {
  type: 'rawlist',
  name: 'licence',
  message: 'What licence type would you like to use?',
  choices: licences
};

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
  licenceQuestions,
  ciQuestions
];
inquirer.prompt(questions).then(answers => {
  console.log('\nLicence:');
  console.log(JSON.stringify(answers, null, '  '));
});

