const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/sendEmail.js");
const randomString = require("random-string");

// all user information delete
// url: http://localhost:23629/all-user-delete/:id
// method: DELETE
const allUserDelete = async (req, res) => {
  try {
    // delete user
    const filterUser = await User.findByIdAndDelete({ _id: req.params.id });

    if (!filterUser)
      return res.status(400).json({ message: "user filter failed." });

    // find existing user from Database
    const _allUser = await User.find();

    // if user not found
    if (!_allUser) return res.status(400).json({ message: "User not found." });

    const allUseInfo = _allUser.map((singleUser) => {
      return {
        _id: singleUser._id,
        userId: singleUser.userId,
        name: singleUser.name,
        email: singleUser.email,
        password: singleUser.password,
        phone: singleUser.phone,
        role: singleUser.role,
        account_Confirmed: singleUser.account_Confirmed,
        profile_pic: singleUser.profile_pic,
        createdAt: singleUser.createdAt,
      };
    });

    return res.status(200).json({
      message: "All User",
      users: allUseInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// all user information Update
// url: http://localhost:23629/all-user-update/:id
// method: PATCH
const allUserUpdate = async (req, res) => {
  try {
      const {userId, name, email, password, phone,role, account_Confirmed, createdAt} = req.body;
    // delete user
    const temp = {
        userId,
        name,
        email,
        password,
        phone,
        role,
        account_Confirmed,
        createdAt
    }
    const _updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: temp },
      { new: true}
    );

    if (!_updateUser)
      return res.status(400).json({ message: "user filtering failed." });

    // find existing user from Database
    const _allUser = await User.find();

    // if user not found
    if (!_allUser) return res.status(400).json({ message: "User not found." });

    const allUseInfo = _allUser.map((singleUser) => {
      return {
        _id: singleUser._id,
        userId: singleUser.userId,
        name: singleUser.name,
        email: singleUser.email,
        password: singleUser.password,
        phone: singleUser.phone,
        role: singleUser.role,
        account_Confirmed: singleUser.account_Confirmed,
        profile_pic: singleUser.profile_pic,
        createdAt: singleUser.createdAt,
      };
    });

    return res.status(200).json({
      message: "All User",
      users: allUseInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

module.exports = {
  allUserDelete,
  allUserUpdate,
};
