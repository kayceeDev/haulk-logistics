const globalErrorHandler = require("./error");
const inventoryControllers = require("./inventory");
const shipmentControllers = require("./shipment");
const categoryControllers = require("./category");
const statusControllers = require("./status");

module.exports = {
  globalErrorHandler,
  inventoryControllers,
  shipmentControllers,
  categoryControllers,
  statusControllers,
};
