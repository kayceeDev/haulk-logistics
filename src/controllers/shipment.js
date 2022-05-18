const { inventoryModel, categoryModel, shipmentModel } = require("../models");
const { statusModel } = require("../models");
const { createSendData } = require("../utils");
const { filterObj } = require("../utils/filterFields");
const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils");

const createShipment = asyncHandler(async (req, res, next) => {
  const { name, startLocation, destinationLocation, inventory } = req.body;

  const shipmentExist = await shipmentModel.findOne({ name });
  if (shipmentExist) {
    return next(new AppError("shipment already exists", 404));
  }
  const inventoryExist = await inventoryModel.findById(inventory);
  if (!inventoryExist) {
    return next(new AppError("inventory with ID doesn't exists", 404));
  }
  shipmentData = {
    name,
    startLocation,
    destinationLocation,
    inventory,
  };
  newShipment = await new shipmentModel(shipmentData).save();
  const statusData = {
    inventoryId: inventory,
    status: "assigned",
  };
  await new statusModel(statusData).save();
  return createSendData(newShipment, 201, res);
});

const getAllShipments = asyncHandler(async (req, res, next) => {
  const shipments = await shipmentModel.find();
  return createSendData(shipments, 200, res);
});

const getOneShipment = asyncHandler(async (req, res, next) => {
  const shipment = await shipmentModel
    .findById(req.params.id)
    .populate("inventory")
    .select("-__v");
  if (!shipment) {
    return next(new AppError("No shipment found with that ID", 404));
  }
  return createSendData(shipment, 200, res);
});

const updateShipment = asyncHandler(async (req, res, next) => {
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "startLocation",
    "destinationLocation",
    "inventory"
  );

  // Update user document
  const updatedShipment = await shipmentModel.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedShipment) {
    return next(new AppError("No inventory found with that ID", 404));
  }

  return createSendData(updatedShipment, 200, res);
});

const deleteShipment = asyncHandler(async (req, res, next) => {
  const shipment = await shipmentModel.findByIdAndDelete(req.params.id);
  if (!shipment) {
    return next(new AppError("No inventory found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createShipment,
  getAllShipments,
  getOneShipment,
  updateShipment,
  deleteShipment,
};
