const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "subCategory title is required"],
    unique: true,
    trim: true,
    minlength: [3, "category must be at least 3 characters"],
  },
  
  price: {
    type: Number,
    required: [true, "subCategory price is required"],
    min: [0, "Price must be greater than or equal to 0"],
    set: (value) => Math.round(value),
  }
} , {timestamps : true});


const SubCategoryModel = mongoose.model("SubCategoryModel" , subCategorySchema);


module.exports = {
    SubCategoryModel
}
