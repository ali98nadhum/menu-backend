const asyncHandler = require("express-async-handler");
const {CategoryModel} = require("../models/category");



// ==================================
// @desc Get all category
// @route /api/v1/category
// @method GET
// @access public
// ==================================
module.exports.getAllCategory = asyncHandler(async (req , res) => {
    const categorys = await CategoryModel.find();
    res.status(200).json({data: categorys})
})