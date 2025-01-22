const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "subCategory title is required"],
    unique: true,
    trim: true,
    minlength: [3, "category must be at least 3 characters"],
    maxlength: [50, "category must be at most 50 characterss"],
  },
  
  price: {
    type: Number,
    required: [true, "subCategory price is required"],
    min: [0, "Price must be greater than or equal to 0"],
    set: (value) => Math.round(value),
  }
} , {timestamps : true});


const ProductModel = mongoose.model("ProductModel" , productSchema);


module.exports = {
  ProductModel
}
