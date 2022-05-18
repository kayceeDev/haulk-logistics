const mongoose = require("mongoose");
// const { categoryModel } = require(".");
// const { AppError } = require("../utils");

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
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// inventorySchema.pre("save", async function (next) {
//   const newCategory = await categoryModel.find({name: this.category });
//   if (!newCategory) {
//     return next(new AppError("category doesn't exist", 404));
//   }
//   this.category = newCategory._id;
//   next();
// });

inventorySchema.virtual("total_price").get(function () {
  return this.unit_price * this.quantity;
});

inventorySchema.virtual("status", {
  ref: "Status",
  foreignField: "inventoryId",
  localField: "_id",
});

module.exports = mongoose.model("Inventory", inventorySchema);
