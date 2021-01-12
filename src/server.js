'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config;
const router = require('./auth/router');
const extraRouter = require('./extra-routes');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.status(200).send('Server was hit successflly!'));
app.use(router);
app.use(extraRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};
