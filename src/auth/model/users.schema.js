'use strict';

const mongoose = require('mongoose');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] },
});

module.exports = mongoose.model('users', users);
