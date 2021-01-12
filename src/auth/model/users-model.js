'use strict';

let usersSchema = require('./users.schema');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
class Users {
  constructor() {
    this.schema = usersSchema;
  }
  async create(record) {
    console.log('inside create user');
    let newRecord = new this.schema({
      username: record.username,
      password: await bcrypt.hash(record.password, 10),
    });
    console.log(newRecord.password);

    let nrewRec = await newRecord.save();
    return nrewRec;
  }
  get(cred) {
    let obj = cred ? { username: cred.username } : {};
    return this.schema.find(obj);
  }
  getById(_id) {
    if (_id) {
      return this.schema.findById(_id);
    } else {
      return null;
    }
  }
  async authenticate(cred) {
    let user = await this.schema.findOne({ username: cred.username }).exec();
    console.log(user);
    if (user) {
      let auth = await bcrypt.compare(cred.password, user.password);
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
      process.env.SECRET
    );
    return token;
  }
  async checkUser(usr) {
    let result = await this.get({ username: usr });
    console.log(result);
    return result;
  }
  async checkUsername(usr) {
    console.log(usr);
    let user = await this.schema.findOne({ username: usr }).exec();
    if (user) {
      return user;
    } else {
      let pass = 'ouathPass123';
      let p = await this.create({
        username: usr,
        password: pass,
      });
      console.log(p);
      return p;
    }
  }

  async authenticateToken(token, secret) {
    console.log(secret);
    console.log(token);
    let tokenObject = await jwt.verify(token, secret);
    console.log('tokenObject : ', tokenObject);
    //let checkUserExist = await this.get({ username: tokenObject.username });

    return tokenObject;
  }
}
module.exports = new Users();
