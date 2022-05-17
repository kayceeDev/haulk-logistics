const express = require("express");
const cors = require("cors");
const helmet = require( "helmet");
const morgan = require( "morgan");
const xss = require("xss-clean");
const app = express()
const v1 = require('./routes');

const { globalErrorHandler } = require("./controllers");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan("dev"));

// routes
app.use("/api/v1", v1);
// app.use("/", baseRouter);

app.use(globalErrorHandler);

// unhandled rejection
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! 🎇 Shutting down');
    app.close(() => {
      process.exit(1);
    });
  });
  
module.exports = app;
