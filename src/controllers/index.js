const globalErrorHandler = require("./error");
const {
  createInventory,
  getAllInventory,
  getOneInventory,
  updateInventory,
  deleteInventory,
} = require("./inventory");
const { createCategory, getAllCategory } = require("./category");
const { createStatus, getAllStatus } = require("./status");

module.exports = {
  globalErrorHandler,
  createCategory,
  getAllCategory,
  createStatus,
  getAllStatus,
  createInventory,
  getAllInventory,
  getOneInventory,
  updateInventory,
  deleteInventory
};
