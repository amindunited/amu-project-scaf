const npmCLILogin = require('@amindunited/npm-cli-login');

let username = 'amindunited';
let password = '****';
let email = 'buckley.robin@gmail.com';
let scope = '@amindunited';

npmCLILogin(usename, password, email, null, scope)
.then((data) => {
  console.log('login success ', data);
}, (err) => {
  console.log('there was an error ', err);
});
