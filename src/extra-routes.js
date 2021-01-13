'use strict';

const express = require('express');
const base64 = require('base-64');
const router = express.Router();
const Users = require('./auth/model/users-model');
const bearerMiddleware = require('./auth/middleware/bearer-auth');
const permissions = require('./auth/middleware/authorize');

router.get('/secret', bearerMiddleware, (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});
router.get('/read', bearerMiddleware, permissions('read'), (req, res) => {
  res.status(200).json({ message: 'Route /read worked' });
});
router.post('/add', bearerMiddleware, permissions('create'), (req, res) => {
  res.status(200).json({ message: 'Route /add worked' });
});
router.put('/change', bearerMiddleware, permissions('update'), (req, res) => {
  res.status(200).json({ message: 'Route /change worked' });
});
router.delete(
  '/remove',
  bearerMiddleware,
  permissions('delete'),
  (req, res) => {
    res.status(200).json({ message: 'Route /remove worked' });
  }
);

module.exports = router;
