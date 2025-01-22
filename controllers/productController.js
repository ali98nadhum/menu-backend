const asyncHandler = require("express-async-handler");
const {ProductModel} = require("../models/product");
const { validateCreateSubCategory } = require("../middlewares/subCategoryValidation");



// ==================================
// @desc Get all subCategory
// @route /api/v1/subcategories
// @method GET
// @access public
// ==================================
module.exports.getSubCategorys = asyncHandler(async(req , res) => {
    const subcategories = await ProductModel.find();
    res.status(200).json({data: subcategories})
})


// ==================================
// @desc Create new Subcategory
// @route /api/v1/subcategory
// @method POST
// @access Private (only admin)
// ==================================
module.exports.createSubCategory = asyncHandler(async (req , res) => {
    // validtion input data
    const {error} = validateCreateSubCategory(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if Subcategory title is unique
    const existingSubcategory = await ProductModel.findOne({
        title: req.body.title,
    });
    if(existingSubcategory){
        res.status(400).json({message: "title already exists"})
    }

    // Create Subcategory
    const newSubcategory = await ProductModel.create({
        title: req.body.title,
        price: req.body.price,
    })

    res.status(201).json(newSubcategory)
})