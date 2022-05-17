const { categoryModel } = require("../models");
const { createSendData } = require("../utils");

const asyncHandler = require("express-async-handler");
const AppError = require("../utils");

const createCategory = asyncHandler(async (req, res, next) => {
  const { name, inventoryId } = req.body;

  const categoryData = {
    name,
    inventoryId
  };

  const category = await new categoryModel(categoryData).save();
  return createSendData(category, 201, res);
});

const getAllCategory = asyncHandler(async(req,res,next)=>{
    const categories= await categoryModel.find().populate("inventoryID")
    return createSendData(categories,200,res)
})



module.exports = {
    createCategory,
    getAllCategory,
}
