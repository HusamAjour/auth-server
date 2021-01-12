'use strict';

const express = require('express');
const Users = require('./model/users-model');
const base64 = require('base-64');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const OAuthMiddleware = require('./middleware/oauth');
const notFoundHandler = require('../middleware/404');
const errorHandler = require('../middleware/500');

router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler);
router.get('/users', usersHandler);
router.get('/users', usersHandler);
router.get('/oauth', OAuthMiddleware, oauthHandler);

async function signUpHandler(req, res) {
  console.log('inside signup route');
  if (req.headers.authorization != `Basic Og==`) {
    let authHeader = req.headers.authorization.split(' ');
    if (authHeader[0] != 'Basic') {
      res.status(500).json({ error: 'Error! something is wrong!' });
    }
    let basic = authHeader.pop();
    let [username, password] = base64.decode(basic).split(':');
    let users = await Users.create({ username, password });
    res.status(200).json(users);
  } else if (req.body.username && req.body.password) {
    console.log('inside signup route req.body');
    let users = await Users.create(req.body);
    res.status(200).json(users);
  } else {
    console.log('ERR! no data was send');
  }
}

async function signInHandler(req, res) {
  console.log('inside signin route');
  if (req.token) {
    res.set('token', req.token);
    res.cookie('token', req.token);
    res.status(200).json({
      token: req.token,
      user: req.user,
    });
  }
}

async function usersHandler(req, res) {
  let users = await Users.get();
  res.status(200).json(users);
}


async function oauthHandler(req, res){
  if (req.token) {
    res.set('token', req.token);
    res.cookie('token', req.token);
    res.status(200).json({
      token: req.token,
      user: req.user,
    });
  }
}
module.exports = router;
