const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category"],
  },
  inventoryId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Inventory",
    },
  ],
});

// categorySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "inventoryId",
//     select: "name quantity unit_price",
//   });
//   next();
// });

module.exports = mongoose.model("Category", categorySchema);
