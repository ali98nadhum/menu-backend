const asyncHandler = require("express-async-handler");
const {SubCategoryModel} = require("../models/subcategory");



// ==================================
// @desc Get all subCategory
// @route /api/v1/subcategories
// @method GET
// @access public
// ==================================
module.exports.getSubCategorys = asyncHandler(async(req , res) => {
    const subcategories = await SubCategoryModel.find();
    res.status(200).json({data: subcategories})
})