const express = require("express");
const inventoryControllers = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(inventoryControllers.getAllInventory)
  .post(inventoryControllers.createInventory);

  router.route("/:id")
  .get()
  .patch()
  .delete()

  module.exports = router