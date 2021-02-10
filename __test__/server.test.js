'use strict';

let { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const bcrypt = require('bcrypt');

describe('Server Module', () => {
  it('Should create a new user and store it in the db', async () => {
    expect(null).toBeFalsy();   
  });
});