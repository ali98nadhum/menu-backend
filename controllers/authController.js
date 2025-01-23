const asyncHandler = require("express-async-handler");
const { ValidateRegesterData } = require("../middlewares/userValidationData");
const {UserModel}  = require("../models/user");
const bcrypt = require("bcryptjs");



// ==================================
// @desc Register admin
// @route /api/v1/auth/register
// @method POST
// @access private ( only admin )
// ==================================
module.exports.registerAdmin = asyncHandler(async(req , res) => {
    const {error} = ValidateRegesterData(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // if user already registered
    const user  = await UserModel.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({message: "User already registered with this email"})
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
  const newUser = await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

    res.status(201).json({message: "User registered successfully"});
 
})
