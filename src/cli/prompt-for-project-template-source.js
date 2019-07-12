const inquirer = require('inquirer');

/**
 * Where should we load the templates from?
 */
const promptForProjectTemplateSource = () => {
  const questions = {
    name: 'templateSource',
    type: 'list',
    choices: [{
      name: 'local',
      value: './mock_src/project-templates'
    }, {
      name: 'github',
      value: 'http://amindunited.github.com/'
    }],
    // Since 'local' is the first selection, default might not be nessesary
    default: {
      name: 'local',
      value: './mock_src/project-templates'
    }
  }
  return inquirer.prompt(questions).then(async (answers) => {
    console.log('Use templates from: ', answers);
    // userConfig = Object.assign({}, userConfig, answers);
    return answers;
  });
}

module.exports = promptForProjectTemplateSource;
