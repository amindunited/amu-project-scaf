/**
 * Every project should have:
 *
 * [ ] Project Name
 * [ ] NPM Login Details
 * [ ] NPM Scope
 * [ ] NVMRC
 * [ ] Description
 * [✓] Get author name
 * [ ] .gitignore
 * [ ] .editorconfig
 * [✓] LICENSE
 * [ ] git repo
 * [ ] README.md
 *      requires:
 *        Project Name
 *        Author
 *        Description
 */

const chalk = require('chalk');
const inquirer = require('inquirer');

const prompts = require('./prompts');

const projectInfo = async () => {
  inquirer.prompt(questions).then(async (answers) => {

  });
}

module.exports = projectInfo;

