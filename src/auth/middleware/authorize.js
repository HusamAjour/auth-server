'use strict';
const users = require('../model/users-model');

module.exports = (capability) => {
  return (req, res, next) => {
    console.log('inside authorize');
    console.log(req.user);
    let usr = req.user;
    let authorized = users.can(usr.role, capability);
    if (authorized) {
      next();
    } else {
      res.status(403).send('Access Denied!');
    }
  };
};
