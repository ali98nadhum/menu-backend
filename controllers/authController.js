const asyncHandler = require("express-async-handler");
const { ValidateRegesterData, ValidateLoginData } = require("../middlewares/userValidationData");
const {UserModel}  = require("../models/user");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../helper/hashPassword");



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
    const hashedPassword = await hashPassword(req.body.password);

    // create new user
  const newUser = await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

    res.status(201).json({message: "User registered successfully"});
 
})







// ==================================
// @desc Login admin
// @route /api/v1/auth/login
// @method POST
// @access private ( only admin )
// ==================================
module.exports.loginAdmin = asyncHandler(async(req , res) => {
  // Validate input data
  const {error} = ValidateLoginData(req.body);
  if(error){
    return res.status(400).json({message: error.details[0].message});
  }

  // Check if user exists
  const user = await UserModel.findOne({email: req.body.email});
  if(!user){
    return res.status(400).json({message: "Invalid email or password"})
  }

  // Check if password matches
  const isPasswordMatch = await bcrypt.compare(req.body.password , user.password);
  if(!isPasswordMatch){
    return res.status(400).json({message: "Invalid email or password"})
  }

  res.status(200).json({message:`login_success hi ${user.username}`})
})
