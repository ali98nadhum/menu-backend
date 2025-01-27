const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [50, "username must be at most 50 characterss"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = {
  UserModel,
};
