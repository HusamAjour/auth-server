'use strict';

const superagent = require('superagent');
const users = require('../model/users-model');

const tokenUrl = 'https://github.com/login/oauth/access_token';
const userUrl = 'https://api.github.com/user';
const API_SERVER = 'http://localhost:3000/oauth';

module.exports = async function (req, res, next) {
  let code = req.query.code; // form code
  let remoteToken = await exchangeCodeWithToken(code);
  let remoteUser = await getRemoteUserInfo(remoteToken);
  let [localUser, localToken] = await getUser(remoteUser);
  req.user = localUser;
  req.token = localToken;
  next();
};

async function exchangeCodeWithToken(code) {
  // tokenUrl
  let tokenResponse = await superagent.post(tokenUrl).send({
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.SECRET_ID,
    redirect_uri: API_SERVER,
  });
  return tokenResponse.body.access_token;
}

async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(userUrl)
    .set('Authorization', `token ${token}`)
    .set('user-agent', '401d6-app');
  let user = userResponse.body;
  return user;
}

async function getUser(userObj) {
  let isUser = await users.checkUsername(userObj.login);
  let token = await users.generateAToken({
    username: isUser.username,
    password: isUser.password,
  });
  let user = isUser.username;
  return [user, token];
}
