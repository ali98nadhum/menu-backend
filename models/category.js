const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
      unique: true,
      trim: true,
      minlength: [3, "category must be at least 3 characters"],
      maxlength: [50, "category must be at most 50 characterss"],
    },

    image: {
      type: Object,
      required: [true, "category image is required"],
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  { timestamps: true }
);



const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

module.exports = {
  CategoryModel,
};
