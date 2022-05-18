const { categoryModel } = require("../models");
const { createSendData } = require("../utils");

const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils");

const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const categoryData = {
    name,
  };
  const categoryExists = await categoryModel.findOne({name})
  if (categoryExists) {
    return next(new AppError("Category already exists", 404));
  }
  const category = await new categoryModel(categoryData).save();
  return createSendData(category, 201, res);
});

const getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.find();
  return createSendData(categories, 200, res);
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
