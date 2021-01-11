'use strict';

let { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const bcrypt = require('bcrypt');

describe('Server Module', () => {
  it('Should create a new user and store it in the db', async () => {
    const userCred = {
      username: 'Pam',
      password: 'pamela321',
    };
    console.log(userCred);
    mockRequest
      .post('/signup')
      .send(userCred)
      .then((result) => {
        console.log(result);
        let encPass = bcrypt.comopare(userCred.password, result.password);
        console.log(encPass);
        expect(result.body.username).toEqual(userCred.username);
        expect(encPass).toBeTruthy();
      });
  });
  it('Should create a token if user exists and the password is correct', () => {
    let userCred = {
      username: 'Jim',
      password: 'Halpert321',
    };

    mockRequest
      .post('/signup')
      .send(userCred)
      .then((result) => {
        mockRequest
          .post('/signin')
          .send(userCred)
          .then((result2) => {
            let encPass = bcrypt.comopare(
              userCred.password,
              result2.user.password
            );
            expect(result2.token).toBeTruthy();
            expect(encPass).toBeTruthy();
          });
      });
  });
});
