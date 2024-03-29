const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User.js");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;
const randomString = require("random-string");

// chicks buy route
// url: http://localhost:23629/chicks-buy
// method: PUT
const chicksBuy = async (req, res) => {
  try {
    const { company, quantity, price } = req.body;

    // find user from data base
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update chicks Numbers
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
      company,
      quantity,
      price,
      date: moment().format("MM/DD/YYYY") + " " + moment().format("hh:mm:ss"),
    };
    const chicks = await User.findOneAndUpdate(
      { email: _user.email },
      { $set: { Bring_chicks: temp } },
      { new: true }
    );
    if (!chicks)
      return res.status(400).json({ message: "Chicks Added Successfully." });

    // if success
    return res.status(200).json({
      message: "Chicks update successfully.",
      chicks: chicks.Bring_chicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// chicks Update route
// url: http://localhost:23629/chicks-update
// method: PUT
const chicksUpdate = async (req, res) => {
  try {
    const { _id, id2, company, quantity, price, date, salesDate } = req.body;

    // find user from data base
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update chicks info
    const temp = {
      _id: ObjectId(_id),
      id2,
      company,
      quantity,
      price,
      date,
      salesDate,
    };
    const chicksUpdate = await User.findOneAndUpdate(
      { email: _user.email },
      { $set: { Bring_chicks: temp } },
      { new: true }
    );

    if (!chicksUpdate)
      return res.status(400).json({ message: "Chicks Update Failed." });

    // if success
    return res.status(200).json({
      message: "Chicks update successfully.",
      chicks: chicksUpdate.Bring_chicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// chicks sales status
// url: http://localhost:23629/chicks-sales-info
// method: PUT
const chicksSalesInfo = async (req, res) => {
  try {
    const { sellDate } = req.body;

    // find user from data base
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update chicks info
    const temp = {
      sellDate
    };
    const chicksSalesUpdate = await User.findOneAndUpdate(
      { email: _user.email },
      { $set: { sales_info: temp } },
      { new: true }
    );

    if (!chicksSalesUpdate) return res.status(400).json({ message: "sales status update failed." });

    // if success
    return res.status(200).json({
      message: "sales status update successfuylly..",
      chicksSalesUpdate: chicksSalesUpdate.sales_info,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

const chicksDelete = async (req, res) => {
  try {
    // find user from data base
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // delete chicks
    const deleleChicks = await User.findOneAndUpdate(
      { email: _user.email },
      { $set: { Bring_chicks: null } },
      { new: true }
    );

    if (!deleleChicks)
      return res.status(400).json({ message: "Chicks Deleted successfully." });

    return res.status(200).json({
      message: "Chicks Deleted Successfully",
      chicks: deleleChicks.Bring_chicks,
    });
  } catch (error) { }
};

// chicks death route
// url: http://localhost:23629/chicks-death
// method: PUT
const chicksDeath = async (req, res) => {
  try {
    const { death, reason } = req.body;

    // find user from Database
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update death count
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
      death,
      reason,
      time: new Date().toLocaleTimeString(),
      date: moment().format("DD/MM/YYYY"),
    };
    // let RunTime = new Date().getHours();
    // const temp = {
    //   _id: ObjectId(),
    //   id2: id_p1 + id_p2,
    //   death,
    //   reason,
    //   time:
    //     RunTime < 12
    //       ? `${moment().format("hh:mm:ss")} am`
    //       : `${moment().format("hh:mm:ss")} pm`,
    //   date: moment().format("DD/MM/YYYY"),
    // };
    const userData = await User.findOneAndUpdate(
      { email: _user.email },
      { $push: { die_chicks: temp } },
      { new: true }
    );
    // if problem
    if (!userData)
      return res.status(400).json({ message: "Chicks death are not updated" });

    // if updated
    return res.status(200).json({
      message: "Chicks Death has been updated",
      deathChicks: userData.die_chicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// chicks death update
// url: http://localhost:23629/chicks-death-update/:id
// method: PUT
const chicksDeathUpdate = async (req, res) => {
  try {
    const { _id, id2, death, reason, time, date } = req.body;

    // find user from Database
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update death count
    const temp = {
      _id: ObjectId(_id),
      id2,
      death,
      reason,
      time,
      date,
    };
    const _deathUpdate = await User.findOneAndUpdate(
      { email: _user.email, "die_chicks.id2": req.params.id },
      { $set: { "die_chicks.$": temp } },
      { new: true }
    );

    if (!_deathUpdate)
      return res.status(400).json({ message: "death chicks update failed." });

    return res.status(200).json({
      message: "chicks death updated succesfylly.",
      deathChicks: _deathUpdate.die_chicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};

// chicks death delete
// url: http://localhost:23629/chicks-death-delete/:id
// method: PUT
const chicksDeathDelete = async (req, res) => {
  try {
    // find user from Database
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // delete death chicks
    const _deleteDeathChicks = await User.findOneAndUpdate(
      { email: _user.email },
      { $pull: { die_chicks: { _id: ObjectId(req.params.id) } } },
      { new: true }
    );

    // if not deleted
    if (!_deleteDeathChicks)
      return res.status(400).json({ message: "chicks delete failed" });

    // if success
    return res.status(200).json({
      message: "Death chicks delete succesfull.",
      deathChicks: _deleteDeathChicks.die_chicks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};



// add chicks sales summary
// url: http://localhost:23629/chicks-sales-summary
// method: PUT
const chicksSalesSummary = async (req, res) => {
  try {
    const { customer, description, pcs, kg, price } = req.body;

    // find user from Database
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });
    console.log("this is temp", customer, description, pcs, kg, price);

    // update chicks Numbers
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
      customer,
      description,
      pcs,
      kg,
      price,
      date: moment().format("DD/MM/YYYY") + " " + moment().format("hh:mm:ss"),
    };

    // delete death chicks
    const salesSummary = await User.findOneAndUpdate(
      { email: _user.email },
      { $push: { salesSummary: temp } },
      { new: true }
    )

    // if not deleted
    if (!salesSummary) return res.status(400).json({ message: "chicks Sales Summary update failed" });

    // if success
    return res.status(200).json({
      message: "chicks Sales Summary update successfully.",
      salesSummary: salesSummary.salesSummary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};



// delete add chicks sales summary
// url: http://localhost:23629/chicks-sales-summary-delete/:id
// method: PUT
const chicksSalesSummaryDelete = async (req, res) => {
  try {
    // find user from Database
    const _user = await User.findOne({ "salesSummary._id": req.params.id });
    console.log("sssss", _user);
    // if user not found
    if (!_user) return res.status(400).json({ message: "Sales field not found." });

    // delete death chicks
    const _deleteSalesSummary = await User.findOneAndUpdate(
      { email: _user.email },
      { $pull: { salesSummary: { _id: ObjectId(req.params.id) } } },
      { new: true }
    );

    // if not deleted
    if (!_deleteSalesSummary) return res.status(400).json({ message: "failed to delete" });

    // if success
    return res.status(200).json({
      message: "field deleted successfully.",
      salesSummary: _deleteSalesSummary.salesSummary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};



// update add chicks sales summary
// url: http://localhost:23629/chicks-death-update/:id
// method: PUT
const chicksSalesSummaryUpdate = async (req, res) => {
  try {
    const { _id, id2, customer, description, pcs, kg, price, date } = req.body;

    // find user from Database
    const _user = await User.findOne({ email: req.user.email });

    // if user not found
    if (!_user) return res.status(400).json({ message: "User not found." });

    // update death count
    const temp = {
      _id: ObjectId(_id),
      id2,
      customer,
      description,
      pcs,
      kg,
      price,
      date,
    };
    const _salesUpdate = await User.findOneAndUpdate(
      { email: _user.email, "salesSummary._id": req.params.id },
      { $set: { "salesSummary.$": temp } },
      { new: true }
    );

    if (!_salesUpdate)
      return res.status(400).json({ message: "Sales Summary failed to update." });

    return res.status(200).json({
      message: "Sales Summary updated successfully.",
      salesSummary: _salesUpdate.salesSummary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};



module.exports = {
  chicksBuy,
  chicksUpdate,
  chicksSalesInfo,
  chicksDelete,
  chicksDeath,
  chicksDeathUpdate,
  chicksDeathDelete,
  chicksSalesSummary,
  chicksSalesSummaryDelete,
  chicksSalesSummaryUpdate
};
