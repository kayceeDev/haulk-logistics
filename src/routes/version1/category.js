const express = require("express");
const categoryControllers = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(categoryControllers.getAllCategory)
  .post(categoryControllers.createCategory);

  router.route("/:id")
  .get()
  .patch()
  .delete()

  module.exports = router