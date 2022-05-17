const { inventoryModel } = require("../models");
const { createSendData } = require("../utils");

const asyncHandler = require("express-async-handler");
const AppError = require("../utils");
const { findByIdAndUpdate } = require("../models/status_history");

const createInventory = asyncHandler(async (req, res, next) => {
  const { name, unit_price, quantity } = req.body;
  const inventoryExist = await inventoryModel.findOne({ name });
  let inventoryData, inventory;
  if (inventoryExist) {
    console.log(inventoryExist)
    inventoryData = {
      quantity: inventoryExist.quantity + quantity,
    };
    // console.log(inventoryExist[0].quantity)
    inventory = await inventoryModel.findByIdAndUpdate(inventoryExist._id, {
      quantity: inventoryData.quantity,
    },);
    return createSendData(inventory, 201, res);
  } else {
    inventoryData = {
      name,
      unit_price,
      quantity,
    };
    inventory = await new inventoryModel(inventoryData).save();
    return createSendData(inventory, 201, res);
  }
});

const getAllInventory = asyncHandler(async (req, res, next) => {
  const inventories = await inventoryModel.find().populate("category");
  return createSendData(inventories, 200, res);
});

const getOneInventory = asyncHandler(async(req, res,next)=>{
  const inventory = await inventoryModel.findById(req.params.id)
  if (!inventory) {
    return next(new AppError("No user found with that ID", 404));
  }
  return createSendData(inventory, 200, res);
})
module.exports = {
  createInventory,
  getAllInventory,
  getOneInventory
};
