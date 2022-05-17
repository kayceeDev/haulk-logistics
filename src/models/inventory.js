const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 10,
      require: [true, "Add a product qunatity"],
    },
    unit_price: {
      type: Number,
      required: [true, "Enter a unit price"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
inventorySchema.virtual("total_price").get(function () {
  return this.unit_price * this.quantity;
});

inventorySchema.virtual("status", {
  ref: "Status",
  foreignField: "inventoryId",
  localField: "_id",
});

inventorySchema.virtual("category", {
  ref: "Category",
  foreignField: "inventoryId",
  localField: "_id",
});

// userSchema.pre("save", async function (next) {
//   this.total_price = parseInt(this.quantity * this.price);
//   next();
// });

module.exports = mongoose.model("Inventory", inventorySchema);
