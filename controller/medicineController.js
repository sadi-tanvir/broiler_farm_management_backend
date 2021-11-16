const dotenv = require("dotenv")
dotenv.config()
const User = require('../models/User.js')
const moment = require("moment")
const ObjectId = require("mongodb").ObjectId
const randomString = require("random-string")





// medicine buy route
// url: http://localhost:23629/medicine-buy
// method: PUT
const medicineBuy = async (req, res) => {
    try {

        const { name, quantity, company, group, price } = req.body;

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // update medicine details
        const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const temp = {
            _id: ObjectId(),
            id2: id_p1 + id_p2,
            name,
            quantity,
            company,
            group,
            price,
            date: moment().format("DD/MM/YYYY")
        }
        const updateDetails = await User.findOneAndUpdate({ email: _user.email }, { $push: { medicine: temp } }, { new: true })

        // if problem
        if (!updateDetails) return res.status(400).json({ message: 'Medicine update failed.' })

        // if success
        return res.status(200).json({
            message: 'Medicine has been updated successfully.',
            buyMedicine: updateDetails.medicine
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};





// medicine delete route
// url: http://localhost:23629/medicine-delete/:id
// method: PUT
const medicineDelete = async (req, res) => {
    try {

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete medicine
        const deleteMedicine = await User.findOneAndUpdate(
            { email: _user.email },
            { $pull: { medicine: { _id: ObjectId(req.params.id) } } },
            { new: true }
        )

        // if any problem
        if (!deleteMedicine) return res.status(400).json({ message: 'Medicine delete failed' })

        // if success
        return res.status(200).json({
            message: 'Medicine Delete Successfull.',
            buyMedicine: deleteMedicine.medicine
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}



const medicineUpdate = async (req, res) => {
    try {

        const { _id, id2, name, quantity, company, group, price, date } = req.body

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // medicine update
        const temp = {
            _id: ObjectId(_id),
            id2,
            name,
            quantity,
            company,
            group,
            price,
            date
        }
        const medicineUpdate = await User.findOneAndUpdate(
            { email: _user.email, 'medicine.id2': req.params.id },
            { $set: { "medicine.$": temp } },
            { new: true }
        )

        if (!medicineUpdate) return res.status(400).json({ message: 'Medicine update failed.' })

        return res.status(200).json({
            message: 'Medicine Updated Successfully',
            buyMedicine: medicineUpdate.medicine
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}


module.exports = {
    medicineBuy,
    medicineDelete,
    medicineUpdate
}