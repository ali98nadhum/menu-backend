const asyncHandler = require("express-async-handler");
const {CategoryModel} = require("../models/category");
const {VaildateCreatCategory} = require("../middlewares/categoryValidation");



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

    res.status(200).json({data: category})
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