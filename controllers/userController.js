const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/user");





// ==================================
// @desc Get All Users
// @route /api/v1/users
// @method GET
// @access private ( only admin )
// ==================================
module.exports.getAllUsers = asyncHandler(async(req , res) => {
    const users = await UserModel.find();
    res.status(200).json({data: users})
})
