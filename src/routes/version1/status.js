const express = require("express");
const {statusControllers} = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(statusControllers.getAllStatus)
  .post(statusControllers.createStatus);

  router.route("/:id")
  .get()
  .patch()
  .delete()

  module.exports = router