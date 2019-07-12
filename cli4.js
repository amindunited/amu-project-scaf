#!/usr/bin/env node
// Hang on ... cli3.js still has some good stuff in it.
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
/**
 * Where should we load the templates from?
 */
const promptForProjectTemplateSource = require('./src/cli/prompt-for-project-template-source');
// const promptForTemplateSource = () => {
//   const questions = {
//     name: 'templateSource',
//     type: 'list',
//     choices: [{
//       name: 'local',
//       value: './mock_src/project-templates'
//     }, {
//       name: 'github',
//       value: 'http://amindunited.github.com/'
//     }],
//     // Since 'local' is the first selection, default might not be nessesary
//     default: {
//       name: 'local',
//       value: './mock_src/project-templates'
//     }
//   }
//   return inquirer.prompt(questions).then(async (answers) => {
//     console.log('Use templates from: ', answers);
//     // userConfig = Object.assign({}, userConfig, answers);
//     return answers;
//   });
// }

/**
 * Get Available Project Templates
 */
const getAvailableProjectTemplates = require('./src/cli/get-available-project-templates');
/**
 * Which Tempalate would you like to use?
 */
const promptForProjectTemplate = require('./src/cli/prompt-for-project-template');
/**
 * Get Template Config
 */
const readTemplateConfig = require('./src/cli/read-project-config');

/**
 * Ask Template Questions
 */
const promptTemplateQuestions = require('./src/cli/prompt-template-questions');
/**
 * Run Pre
 */

/**
 * Run Commands
 */

/**
 * Write Files
 */

/**
 * Run Feature functions
 */

/**
 * Run Post
 */

const runSetup = async () => {
  const templateSource = await promptForProjectTemplateSource();
  const availableProjectTemplates = await getAvailableProjectTemplates(templateSource.templateSource);
  // Format the templates into choices for the the inquirer questions
  const projectTemplates = availableProjectTemplates.reduce((acc, curr) => {
    acc.push({
      path: curr,
      description: '',
      name: curr
    });
    return acc;
  }, []);
  const selectedProjectTemplate = await promptForProjectTemplate(projectTemplates);
  const projectTemplateConfig = await readTemplateConfig(
    templateSource.templateSource + '/' +
    selectedProjectTemplate.projectTemplate
  );
  const userConfig = promptTemplateQuestions(projectTemplateConfig.questions);
  console.log('template source', templateSource);
  console.log('availableProjectTempaltes', availableProjectTemplates);
  console.log('selectedProjectTemplate', selectedProjectTemplate);
  console.log('project template config ', projectTemplateConfig);


}
runSetup();
