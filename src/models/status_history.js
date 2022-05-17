const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  inventoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  status: {
    type: String,
    enum: ["not-assigned", "assigned", "delivered", "cancelled"],
    default: "not-assigned",
  },
});

statusSchema.pre(/^find/, function (next) {
  this.populate({
    path: "inventoryId",
    select: "name quantity unit_price",
  });
  next();
});

module.exports = mongoose.model("Status", statusSchema);
