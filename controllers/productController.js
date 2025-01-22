const asyncHandler = require("express-async-handler");
const {ProductModel} = require("../models/product");
const { validateCreateProduct} = require("../middlewares/productValidation");
const { CategoryModel } = require("../models/category");
const {checkTitle} = require("../helper/titleCheck");



// ==================================
// @desc Get all subCategory
// @route /api/v1/subcategories
// @method GET
// @access public
// ==================================
module.exports.getProducts = asyncHandler(async(req , res) => {
    const subcategories = await ProductModel.find();
    res.status(200).json({data: subcategories})
})


// ==================================
// @desc Create new Subcategory
// @route /api/v1/subcategory
// @method POST
// @access Private (only admin)
// ==================================
module.exports.createProduct = asyncHandler(async (req , res) => {

    const {title , price , category} = req.body;
    
    // validtion input data
    const {error} = validateCreateProduct(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if Subcategory title is unique
    const productTitle = await checkTitle(title , ProductModel);
    if (!productTitle.success) {
        return res.status(400).json({ message: productTitle.message});
    }


    // Check if category exists
    const existingCategory = await CategoryModel.findById(req.body.category);
    if(!existingCategory){
        return res.status(404).json({message: "category not found"})
    }

    // Create Subcategory
    const newSubcategory = await ProductModel.create({
        title,
        price,
        category
    })

    res.status(201).json(newSubcategory)
})