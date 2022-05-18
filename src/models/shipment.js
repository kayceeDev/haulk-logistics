const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a shipment name"],
  },
  inventory: {
    type: mongoose.Types.ObjectId,
    ref: "Inventory",
    required: [true, "Add inventory"],
  },
  destinationLocation: {
    type: String,
    minlength: 5,
    trim: true,
    required: [true, "Add inventory destination"],
  },
  startLocation: {
    type: String,
    minlength: 5,
    trim: true,
    required: [true, "Add inventory pickup location"],
  },
});

shipmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "inventory",
    select: "name quantity unit_price",
  });
  next();
});

module.exports = mongoose.model("Shipment", shipmentSchema);
