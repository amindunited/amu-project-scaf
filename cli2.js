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

/**
 * Every project should have:
 *
 * [ ] git repo
 * [ ] Project Name
 * [ ] NPM Login Details
 * [ ] NPM Scope
 * [ ] NVMRC
 * [ ] Description
 * [✓] Get author name
 * [ ] .gitignore
 * [ ] .editorconfig
 * [✓] LICENSE
 * [ ] README.md
 *      requires:
 *        Project Name
 *        Author
 *        Description
 */

 /**
  * Set up questions:
  * Would you like to use a full project configuration?
  *   |
  *    -- Which one?
  *
  * Which config Files would you like to add?
  *   |
  *   ---
  */

/**
 * projectTemplatesDir:
 * config.json: [
 *  name: 'myProjectName',
 *  url: 'http://...'
 * ]
 * templates/
 *  [myProject]/
 *    config.json: {
 *      "questions": [
 *        {
 *          name:'login',
 *          prompt: "What it your login?",
 *          type: 'string'
 *          },{
 *          name:'password',
 *          prompt: "what is your password",
 *          type: "password"
 *          },
 *          {
 *            name: "cheeses"
 *            prompt: "what kind of cheese?",
 *            type: "multiple",
 *            options: [
 *              {
 *                name: "Brie",
 *                value: "breeeeee"
 *              }
 *            ]
 *          },
 *          {
 *            name: "chocolate",
 *            prompt: "what kind of chocolate?",
 *            type: "single",
 *            options: [
 *              {
 *                name: "Dark",
 *                value: "bitter"
 *              }
 *            ]
 *          }
 *       ],
 *
 *       "templates": [
          {
            "dest": "./.circle-ci",
            "name": "config.yml",
            "url": ".circle-ci/config.yml"
          }
        ],
        "commands": {
          "pre": [],
          "post": []
        }
 *    }
 */


/**
 * promptForTemplateURL
 * promptForProjectConfigurations
 *    then -> getProjectConfigurationTemplates
 *    then -> promptForWhichProjectConfiguration
 *    then -> addProjectQuestionsAndTemplates
 *
 * promptForFileTemplates
 *    then -> getFileTemplates
 *    then -> promptForWhichFileTemplates
 *    then -> addFileQuestionsAndTemplates
 *
 * initNPM
 * promptConfigQuestions
 * runAllPreScripts
 * installPackages
 * writeFiles
 * runAllPostScripts
 *
 */


let templateListURL = 'https://raw.githubusercontent.com/amindunited/amu-project-scaf/master/dist/templates/';
let templateSource = 'https://raw.githubusercontent.com/amindunited/amu-project-scaf/master/dist/templates/node-package/';
let templateConfig;

const getFullTemplateList = () => {
  return fetch(`${templateListURL}templates.json`)
    .then((blob) => {
      return blob.json();
    })
    .then((data) => data);
};

const promptUserForTemplates = (templateList) => {
  const options = templateList.reduce((agg, current) => {
    console.log('aggg', agg);
    agg.push(current.name);
    return agg;
  }, []);
  const questions = {
    type: 'checkbox',
    name: 'templates',
    message: 'Which templates would you like to use?',
    choices: options
  };
  inquirer.prompt(questions).then(async (answers) => {
    console.log('the answers are ', answers);
  });
}



getFullTemplateList()
  .then((list) => { console.log('got the template list ', list); promptUserForTemplates(list.templates); },
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
    );
  });
}
