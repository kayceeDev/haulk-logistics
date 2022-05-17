const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const app = require('./app');
const connect = require('./db');

// configure dotenv and port
dotenv.config();
const port = process.env.PORT || 8800;
const DB = process.env.MONGODB_URI;

const start = asyncHandler(async (_port, _url, _app) => {
  try {
    await connect(_url);
    _app.listen(_port, () => console.log(`Server is running on port: ${_port}`));
  } catch (error) {
    console.log(error);
  }
});


start(port, DB, app);