const express = require("express");
const {inventoryControllers} = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(inventoryControllers.getAllInventory)
  .post(inventoryControllers.createInventory);

  router.route("/:id")
  .get(inventoryControllers.getOneInventory)
  .patch(inventoryControllers.updateInventory)
  .delete(inventoryControllers.deleteInventory)

  module.exports = router