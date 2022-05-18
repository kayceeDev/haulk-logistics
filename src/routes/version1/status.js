const express = require("express");
const {statusControllers} = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(statusControllers.getAllStatus)

  module.exports = router