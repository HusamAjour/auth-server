'use strict';
const users = require('../model/users-model');
require('dotenv').config;
async function bearerMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    next('not LoggedIn!');
    return;
  }
  let authHeader = req.headers.authorization.split(' ');

  if (authHeader[0] != 'Bearer') {
    next('invalid Header!');
    return;
  }

  let token = authHeader[1];
  console.log(authHeader[1]);

  let result = await users.authenticateToken(token, process.env.SECRET);
  console.log(result);
  let checkUserExist = await users.get({ username: result.username });
  console.log(checkUserExist);
  if (checkUserExist) {
    let record = await users.getById(checkUserExist[0]._id);
    req.user = record;
    next();
  } else {
    next('ERR!');
  }
}
module.exports = bearerMiddleware;
