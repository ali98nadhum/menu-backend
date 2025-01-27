const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      unique: true,
      trim: true,
      minlength: [3, "product must be at least 3 characters"],
      maxlength: [50, "product must be at most 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "Price must be greater than or equal to 0"],
      set: (value) => Math.round(value),
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "category is required"],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = {
  ProductModel,
};
