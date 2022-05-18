const { inventoryModel, categoryModel } = require("../models");
const { statusModel } = require("../models");
const { createSendData } = require("../utils");
const { filterObj } = require("../utils/filterFields");
const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils");

const createInventory = asyncHandler(async (req, res, next) => {
  const { name, unit_price, quantity, category } = req.body;
  let inventoryData, inventory;
  // check if inventory exist
  const inventoryExist = await inventoryModel.findOne({ name });
  if (inventoryExist) {
    inventoryData = {
      quantity: inventoryExist.quantity + quantity,
    };
    inventory = await inventoryModel.findByIdAndUpdate(inventoryExist._id, {
      quantity: inventoryData.quantity,
    });
    return createSendData(inventory, 201, res);
  } else {
    const newCategory = await categoryModel.findOne({ name: category });
    if (!newCategory) {
      return next(new AppError("category doesn't exist", 404));
    } else {
      inventoryData = {
        name,
        unit_price,
        quantity,
        category: newCategory._id,
      };
      inventory = await new inventoryModel(inventoryData).save();
      const statusData = {
        inventoryId: inventory._id,
      };
      await new statusModel(statusData).save();
      return createSendData(inventory, 201, res);
    }
  }
});

// get all inventory
const getAllInventory = asyncHandler(async (req, res, next) => {
  const inventories = await inventoryModel.find();
  return createSendData(inventories, 200, res);
});

// get one inventory
const getOneInventory = asyncHandler(async (req, res, next) => {
  const inventory = await inventoryModel
    .findById(req.params.id)
    .populate("category status")
    .select("-__v");
  if (!inventory) {
    return next(new AppError("No inventory found with that ID", 404));
  }
  return createSendData(inventory, 200, res);
});

//update inventory
const updateInventory = asyncHandler(async (req, res, next) => {
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "unit_price", "quantity");

  // Update user document
  const updatedInventory = await inventoryModel.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedInventory) {
    return next(new AppError("No inventory found with that ID", 404));
  }

  return createSendData(updatedInventory, 200, res);
});

// delete inventory
const deleteInventory = asyncHandler(async (req, res, next) => {
  const inventory = await inventoryModel.findByIdAndDelete(req.params.id);
  if (!inventory) {
    return next(new AppError("No inventory found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createInventory,
  getAllInventory,
  getOneInventory,
  updateInventory,
  deleteInventory,
};
