const express = require("express");
const {shipmentControllers} = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(shipmentControllers.getAllShipments)
  .post(shipmentControllers.createShipment);

  router.route("/:id")
  .get(shipmentControllers.getOneShipment)
  .patch(shipmentControllers.updateShipment)
  .delete(shipmentControllers.deleteShipment)

  module.exports = router