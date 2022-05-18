const express = require("express");
const {categoryControllers} = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(categoryControllers.getAllCategory)
  .post(categoryControllers.createCategory);

  router.route("/:id")
  .patch(categoryControllers.updateCategory)
  .delete(categoryControllers.deleteCategory)

  module.exports = router