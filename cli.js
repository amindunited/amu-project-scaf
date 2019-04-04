#!/usr/bin/env node
const chalk = require('chalk');
const readline = require('readline');
const Choices = require('prompt-choices');

console.log(chalk.blue('////////////////////////////////////'));
console.log(chalk.blue('// AMU') + ' Project' + chalk.red(' Scaffolding'));
console.log(chalk.blue('////////////////////////////////////'));

console.log(chalk.yellow('working directory is ', process.cwd()));

console.log(chalk.blue('args ', process.argv));

// const userInput = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// userInput.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`)
//   // userInput.close();
//   askChoices();
// });

var choices = new Choices(['foo', 'bar', 'baz', 'qux', 'fez'], {
  pointer: '   >>>'
});

choices.get('foo').disabled = true;
// console.log(choices.get('foo'))
// console.log(choices.get('bar'))
console.log(choices.render(1))
