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
    let result = await mockRequest.post('/signup').send(userCred);
    console.log(`username: ${result.body.username}`);
    console.log(`password: ${result.body.password}`);
    let encPass = await bcrypt.comopare(
      userCred.password,
      result.body.password,
    );
    console.log(encPass);
    expect(result.body.username).toEqual(userCred.username);
    expect(encPass).toBeTruthy();
  });

  it('Should create a token if user exists and the password is correct', async () => {
    let userCred = {
      username: 'Jim',
      password: 'Halpert321',
    };
    let result = await mockRequest.post('/signup').send(userCred);

    let result2 = await mockRequest.post('/signin').send(userCred);
    let encPass = await bcrypt.comopare(
      userCred.password,
      result2.body.user.password,
    );

    expect(result2.body.token).toBeTruthy();
    expect(encPass).toBeTruthy();
  });
});
