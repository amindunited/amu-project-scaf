const licences = require('./src/licences');

const projectNameQuestion = {
  type: 'input',
  name: 'projectName',
  message: 'What is the project\'s name?'
}

const projectScopeQuestion = {
  type: 'input',
  name: 'projectScope',
  message: 'What is the NPM Scope of the project?'
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

const questions = [
  projectNameQuestion,
  projectAuthorQuestion,
  emailQuestion,
  npmLoginQuestion,
  npmPasswordQuestion,
  projectScopeQuestion,
  licences.licenceQuestions
];

module.exports = questions;
