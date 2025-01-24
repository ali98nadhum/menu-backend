const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/user");





// ==================================
// @desc Get All Users
// @route /api/v1/users
// @method GET
// @access private ( only admin )
// ==================================
