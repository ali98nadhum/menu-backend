const asyncHandler = require("express-async-handler");
const {ProductModel} = require("../models/product");
const { validateCreateProduct, validateUpdateProduct} = require("../middlewares/productValidation");
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
// @desc Create new product
// @route /api/v1/product
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

    // Check if product title is unique
    // const productTitle = await checkTitle(title , ProductModel);
    // if (!productTitle.success) {
    //     return res.status(400).json({ message: productTitle.message});
    // }


    // Check if category exists
    const existingCategory = await CategoryModel.findById(req.body.category);
    if(!existingCategory){
        return res.status(404).json({message: "category not found"})
    }

    // Create new product
    const newProduct = await ProductModel.create({
        title,
        price,
        category
    })

    res.status(201).json(newProduct)
})



// ==================================
// @desc Update product
// @route /api/v1/product/:id
// @method PUT
// @access private ( only admin )
// ==================================
module.exports.updateProduct = asyncHandler(async (req , res) => {
    
    //Get product from database
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        return res.status(404).json({message: "not found product for this id"});
    }

    // validtion input data
    const {error} = validateUpdateProduct(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.price !== undefined) updateData.price = req.body.price;
    if (req.body.category !== undefined) updateData.category = req.body.category;

    // Check if product title is unique
    // const productTitle = await checkTitle(req.body.title , ProductModel);
    // if (!productTitle.success) {
    //     return res.status(400).json({ message: productTitle.message});
    // }

    // Update the product in the database
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true } 
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found for this id" });
    }

    // Send the updated product as a response
    res.status(200).json(updatedProduct);

})


// ==================================
// @desc Delete product
// @route /api/v1/product/:id
// @method DELETE
// @access private ( only admin )
// ==================================
module.exports.deleteProduct = asyncHandler(async(req, res) => {
    
    // get product from database and delete from the database
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if(!product){
        return res.status(404).json({message: "no product for this id"})
    }

    res.json({message: "product deleted"})
})