const readFile = require('../utils/read-file');

const vars = {
  AUTHOR: '',
  YEAR: new Date().getFullYear()
}

const licences = [
  {
    name: 'MIT',
    value: 'mit'
  },
  {
    name: 'BSD 3',
    value: 'bsd-3'
  },
  {
    name: 'ISC',
    value: 'isc'
  }
];

const licenceQuestions = {
  type: 'rawlist',
  name: 'licence',
  message: 'What licence type would you like to use?',
  choices: licences
};

const createLicence = async (value) => {
  if (value.match(/^https/)) {
    // Download Content
    console.log('downloading content');
  } else {
    // Load content from local file
    console.log('loading content from file', `${__dirname}/${value}`);
    await readFile(`${__dirname}/${value}`)
    .then((data) => {
      let result = data;
      Object.keys(vars).map((key) => {
        console.log('replacing ', key);
        result = result.replace('${'+key+'}', vars[key]);
      });
      console.log('result ...', result);
    });

  }
  return null;
}

module.exports = {
  vars,
  licences,
  licenceQuestions,
  createLicence
};
