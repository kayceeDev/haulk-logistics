const globalErrorHandler = require("./error");
const inventoryControllers = require("./inventory");
const shipmentControllers = require('./shipment')
const categoryControllers = require('./category')
const statusControllers = require ('./status')
// const { createCategory, getAllCategory } = require("./category");
// const { createStatus, getAllStatus } = require("./status");

module.exports = {
  globalErrorHandler,
  inventoryControllers,
  shipmentControllers,
  categoryControllers,
  statusControllers,
  // createCategory,
  // getAllCategory,
  // createStatus,
  // getAllStatus,
  // createInventory,
  // getAllInventory,
  // getOneInventory,
  // updateInventory,
  // deleteInventory
};
