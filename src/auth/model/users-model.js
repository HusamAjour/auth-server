'use strict';

let usersSchema = require('./users.schema');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
class Users {
  constructor() {
    this.schema = usersSchema;
  }
  create(record) {
    console.log('inside create user');
    let newRecord = new this.schema({
      username: record.username,
      password: bcrypt.hash(record.password, 10),
    });
    console.log(newRecord.password);

    return newRecord.save();
  }
  get(cred) {
    let obj = cred ? { username: cred.username } : {};
    return this.schema.find(obj);
  }
  authenticate(cred) {

    let user = this.schema.findOne({ username: cred.username }).exec();
    console.log(user);
    if (user) {
      let auth = bcrypt.compare(cred.password, user.password);
      if (auth) {
        return user;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }
  generateAToken(cred) {
    console.log('Inside generateToken');
    console.log(cred);
    let token = jwt.sign(
      { username: cred.username, password: cred.password },
      process.env.SECRET,
    );
    return token;
  }
}

module.exports = new Users();