const User = require("../models/User.js");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;
const randomString = require("random-string");

// others cost add item
// url: http://localhost:23629/others-cost
// method: PUT
const othersCost = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    // find user from database
    const _user = await User.findOne({ email: req.user.email });
    if (!_user) {
      return res.status(400).json({ message: "User not found." });
    }

    // add expense
    const id_p1 = randomString({
      length: 8,
      numeric: false,
      letters: true,
      special: false,
      exclude: ["a", "b", "1"],
    });
    const id_p2 = randomString({
      length: 8,
      numeric: false,
      letters: true,
      special: false,
      exclude: ["a", "b", "1"],
    });
    const temp = {
      _id: ObjectId(),
      id2: id_p1 + id_p2,
      name,
      description,
      category,
      price,
      date: moment().format("DD/MM/YYYY"),
    };
    const _addExpenses = await User.findOneAndUpdate(
      { email: _user.email },
      { $push: { others: temp } },
      { new: true }
    );
    if (!_addExpenses) {
      return res.status(400).json({ message: "Others Expenses adding failed" });
    }

    // success
    return res.status(200).json({
      message: "Others Expenses added successfully",
      othesrsExpense: _addExpenses.others,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// others cost delete item
// url: http://localhost:23629/others-cost-delete/:id
// method: PUT
const othersCostDelete = async (req, res) => {
  try {
    // find user from data base
    const _user = await User.findOne({ email: req.user.email });
    if (!_user) return res.status(400).json({ message: "User not found." });

    // delete item
    const _deleteOthersItem = await User.findOneAndUpdate(
      { email: _user.email },
      { $pull: { others: { _id: ObjectId(req.params.id) } } },
      { new: true }
    );

    // if any error
    if (!_deleteOthersItem)
      return res.status(400).json({ message: "Others Item delete failed." });

    // success
    return res.status(200).json({
      message: "Deleted Successfully.",
      othesrsExpense: _deleteOthersItem.others,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// others cost updates
// url: http://localhost:23629/others-cost-update
// method: PUT
const othersCostUpdate = async (req, res) => {
  try {
    const { _id, id2, name, description, category, price, date } = req.body;

    // find user from data base
    const _user = await User.findOne({ email: req.user.email });
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update data
    const temp = {
      _id: ObjectId(_id),
      id2,
      name,
      description,
      category,
      price,
      date,
    };
    const _updateOthersCost = await User.findOneAndUpdate(
      {email: _user.email, 'others.id2': req.params.id},
      {$set:{'others.$':temp}}, 
      { new: true }
      );

      // if any error
      if(!_updateOthersCost) {return res.status(400).json({ message: 'others item updating failed'})}

    return res.status(200).json({
      message: "Successfully updated.",
      othesrsExpense: _updateOthersCost.others
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

module.exports = {
  othersCost,
  othersCostDelete,
  othersCostUpdate,
};
