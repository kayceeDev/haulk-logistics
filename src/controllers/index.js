const globalErrorHandler = require("./error");
const { createInventory, getAllInventory } = require("./inventory");
const { createCategory, getAllCategory } = require("./category");
const { createStatus, getAllStatus } = require("./status");

module.exports = {
  globalErrorHandler,
  createInventory,
  getAllInventory,
  createCategory,
  getAllCategory,
  createStatus,
  getAllStatus,
};
