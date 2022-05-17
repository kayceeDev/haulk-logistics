const express = require('express');
const {
  inventoryRouter,
  statusRouter,
  categoryRouter
} = require('./version1');

const app = express();

app.use('/inventory', inventoryRouter);
app.use('/category', categoryRouter);
app.use('/status', statusRouter);


module.exports = app;