const { inventoryModel } = require("../models");
const { createSendData } = require("../utils");

const asyncHandler = require("express-async-handler");
const AppError = require("../utils");

const createInventory = asyncHandler(async (req, res, next) => {
  const { name, unit_price, quantity } = req.body;

  const inventoryData = {
    name,
    unit_price,
    quantity,
  };

  const inventory = await new inventoryModel(inventoryData).save();
  return createSendData(inventory, 201, res);
});

const getAllInventory = asyncHandler(async(req,res,next)=>{
    const inventories = await inventoryModel.find().populate('category')
    return createSendData(inventories,200,res)
})


module.exports = {
    createInventory,
    getAllInventory,
}
