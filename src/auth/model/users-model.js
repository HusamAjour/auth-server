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
}

module.exports = new Users();

/*'use strict';

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
      process.env.SECRET
    );
    return token;
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
}

module.exports = new Users();
*/
