'use strict';

const base64 = require('base-64');
const Users = require('../model/users-model');

const basicAuth = async (req, res, next) => {
  console.log('inside basicAuth middleware');
  let authHeader = req.headers.authorization.split(' ');

  if (authHeader[0] != 'Basic') {
    next('invaid login');
    return;
  }
  let basic = authHeader.pop();
  let [username, password] = base64.decode(basic).split(':');
  console.log('before authenticate');
  let auth = await Users.authenticate({ username, password });
  console.log(auth);
  if (auth) {
    console.log('before generateAToken');
    let token = await Users.generateAToken({
      username,
      password,
      role: auth.role,
    });
    console.log('after generateAToken');
    console.log(token);
    req.user = auth;
    req.token = token;
    next();
  } else {
    next('invaid login');
  }
};

module.exports = basicAuth;
