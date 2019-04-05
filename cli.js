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
// console.log(choices.render(1))

let questions = [{
  type: 'expand',
  name: 'toppings',
  message: 'What about the toppings?',
  choices: [
    {
      key: 'p',
      name: 'Pepperoni and cheese',
      value: 'PepperoniCheese'
    },
    {
      key: 'a',
      name: 'All dressed',
      value: 'alldressed'
    },
    {
      key: 'w',
      name: 'Hawaiian',
      value: 'hawaiian'
    }
  ]
}, {
  type: 'expand',
  name: 'toppings',
  message: 'What about the toppings?',
  choices: [
    {
      key: 'p',
      name: 'Pepperoni and cheese',
      value: 'PepperoniCheese'
    },
    {
      key: 'a',
      name: 'All dressed',
      value: 'alldressed'
    },
    {
      key: 'w',
      name: 'Hawaiian',
      value: 'hawaiian'
    }
  ]
}];

inquirer.prompt(questions).then(answers => {
  console.log('\nOrder receipt:');
  console.log(JSON.stringify(answers, null, '  '));
});

