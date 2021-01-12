'use strict';

const express = require('express');
const base64 = require('base-64');
const router = express.Router();
const Users = require('./auth/model/users-model');
const bearerMiddleware = require('./auth/middleware/bearer-auth');

router.get('/secret', bearerMiddleware, (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});

module.exports = router;
