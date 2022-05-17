const { statusModel } = require("../models");
const { createSendData } = require("../utils");

const asyncHandler = require("express-async-handler");
const AppError = require("../utils");

const createStatus = asyncHandler(async (req, res, next) => {
  const { name, inventoryId } = req.body;

  const statusData = {
    name,
    inventoryId
  };

  const status = await new statusModel(statusData).save();
  return createSendData(status, 201, res);
});

const getAllStatus = asyncHandler(async(req,res,next)=>{
    const status= await statusModel.find().populate("inventoryID")
    return createSendData(status,200,res)
})



module.exports = {
    createStatus,
    getAllStatus,
}
