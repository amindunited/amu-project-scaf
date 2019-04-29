const npmLogin = require('npm-cli-login');

const login = (username, password, email) => {
  console.log('npmLogin with u:', username, ', p:', password, ', e:', email);
  console.log('CONT DO NPM LOGIN RIGHT NOW as IT IS NOT ASYNC!');
  // npmLogin(username, password, email);
}

module.exports = {
  login
};
