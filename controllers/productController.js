const asyncHandler = require("express-async-handler");
const {ProductModel} = require("../models/product");
const { validateCreateProduct} = require("../middlewares/productValidation");
const { CategoryModel } = require("../models/category");
const {checkTitle} = require("../helper/titleCheck");





// ==================================
// @desc Get all products
// @route /api/v1/product
// @method GET
// @access public
// ==================================
module.exports.getAllProducts = asyncHandler(async (req , res) => {
    const products = await ProductModel.find();
    res.status(200).json({data: products})
})





// ==================================
// @desc Get product by id
// @route /api/v1/product/:id
// @method GET
// @access public
// ==================================
module.exports.getOneProduct = asyncHandler(async(req , res) => {
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        return res.status(404).json({message: "Not product for this id "})
    }

    res.status(200).json({data:product})
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


// ==================================
// @desc Delete product
// @route /api/v1/product/:id
// @method DELETE
// @access private ( only admin )
// ==================================
module.exports.deleteProduct = asyncHandler(async(req, res) => {
    // get product from database
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        return res.status(404).json({message: "no product for this id"})
    }

    // delete peiduct from db
    await ProductModel.findByIdAndDelete(req.params.id)

    res.json({message: "product deleted"})
})