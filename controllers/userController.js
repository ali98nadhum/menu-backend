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



// ==================================
// @desc Get user by id
// @route /api/v1/users?:id
// @method GET
// @access private ( only admin )
// ==================================
module.exports.getUserById = asyncHandler(async (req , res) => {
    const user = await UserModel.findById(req.params.id);
    if(!user){
        return res.status(404).json({message: "No user for this id"})
    }

    res.status(200).json({data: user});
})
