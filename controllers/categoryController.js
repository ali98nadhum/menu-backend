const asyncHandler = require("express-async-handler");
const {CategoryModel} = require("../models/category");
const {VaildateCreatCategory, VaildateUpdateCategory} = require("../middlewares/categoryValidation");
const { ProductModel } = require("../models/product");



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

// ==================================
// @desc Get category by id
// @route /api/v1/category/:id
// @method GET
// @access public
// ==================================
module.exports.getOneCategory = asyncHandler(async (req , res) => {
    const category  = await CategoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message: "Category not found"})
    }

    // Get Product for category
    const products = await ProductModel.find({ category: category._id });;

    res.status(200).json({data: {...category.toObject(),products: products},});
})


// ==================================
// @desc Create new category
// @route /api/v1/category
// @method POST
// @access Private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async (req , res) => {

    // validtion input data
    const {error} = VaildateCreatCategory(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if category title is unique
    const existingCategory = await CategoryModel.findOne({
        title: req.body.title,
    });
    if(existingCategory){
        res.status(400).json({message: "title already exists"})
    }

    // create new category
    const newCategory = await CategoryModel.create({
        title: req.body.title,
    })

    res.status(201).json(newCategory)
})

// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method POST
// @access Private (only admin)
// ==================================
module.exports.updateCategoey = asyncHandler(async(req , res) => {
    // Get category from database
    const category  = await CategoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message: "not found category for this id"});
    }

    // validtion input data
    const {error} = VaildateUpdateCategory(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if category title is unique
    const existingCategory = await CategoryModel.findOne({
        title: req.body.title,
    });
    if(existingCategory){
        res.status(400).json({message: "title already exists"})
    }


    // Update category in database
    const updateCategory = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
    )

    // send return
    res.status(200).json({data: updateCategory})
})



// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method POST
// @access Private (only admin)
// ==================================
module.exports.deleteCategory = asyncHandler(async (req , res) => {

    // get category from database
    const category  = await CategoryModel.findById(req.params.id);
    if(!category){
       return res.status(404).json({message: "Not found category for this id"})
    }

    // delete category
    await CategoryModel.findByIdAndDelete(req.params.id);

    res.json({message: "Category deleted"})
})