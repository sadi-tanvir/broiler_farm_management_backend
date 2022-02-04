const dotenv = require("dotenv")
dotenv.config()
const User = require('../models/User.js')
const moment = require("moment")
const ObjectId = require("mongodb").ObjectId
const randomString = require("random-string")






// chicks buy route
// url: http://localhost:23629/chicks-buy
// method: PUT
const chicksBuy = async (req, res) => {
    try {

        const { company, quantity, price, salesDate } = req.body;

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // update chicks Numbers
        const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const temp = {
            _id: ObjectId(),
            id2: id_p1 + id_p2,
            company,
            quantity,
            price,
            date: moment().format("MM/DD/YYYY") + " " + moment().format("hh:mm:ss"),
            salesDate
        }
        const chicks = await User.findOneAndUpdate({ email: _user.email }, { $set: { Bring_chicks: temp } }, { new: true })
        if (!chicks) return res.status(400).json({ message: 'Chicks Added Successfully.' })

        // if success
        return res.status(200).json({
            message: 'Chicks update successfully.',
            chicks: chicks.Bring_chicks
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};




const chicksUpdate = async (req, res) => {
    try {

        const { _id, id2, company, quantity, price, date, salesDate } = req.body;

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // update chicks info
        const temp = {
            _id: ObjectId(_id),
            id2,
            company,
            quantity,
            price,
            date,
            salesDate
        }
        const chicksUpdate = await User.findOneAndUpdate(
            { email: _user.email },
            { $set: { Bring_chicks: temp } },
            { new: true }
        )

        if (!chicksUpdate) return res.status(400).json({ message: 'Chicks Update Failed.' })

        // if success
        return res.status(200).json({
            message: 'Chicks update successfully.',
            chicks: chicksUpdate.Bring_chicks
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}


const chicksDelete = async (req, res) => {
    try {
        // find user from data base
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete chicks
        const deleleChicks = await User.findOneAndUpdate(
            { email: _user.email },
            { $set: { Bring_chicks: null } },
            { new: true }
        )

        if (!deleleChicks) return res.status(400).json({ message: 'Chicks Deleted successfully.' })

        return res.status(200).json({
            message: 'Chicks Deleted Successfully',
            chicks: deleleChicks.Bring_chicks
        })
    } catch (error) {

    }
}




// chicks death route
// url: http://localhost:23629/chicks-death
// method: PUT
const chicksDeath = async (req, res) => {
    try {

        const { death, reason } = req.body;

        // find user from Database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // update death count
        const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });

        let RunTime = new Date().getHours()
        
        const temp = {
            _id: ObjectId(),
            id2: id_p1 + id_p2,
            death,
            reason,
            time: RunTime < 12 ? `${moment().format("hh:mm:ss")} am` : `${moment().format("hh:mm:ss")} pm`,
            date: moment().format("DD/MM/YYYY")
        }
        const userData = await User.findOneAndUpdate({ email: _user.email }, { $push: { die_chicks: temp } }, { new: true })
        // if problem
        if (!userData) return res.status(400).json({ message: 'Chicks death are not updated' })


        // if updated
        return res.status(200).json({
            message: "Chicks Death has been updated",
            deathChicks: userData.die_chicks
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// chicks death update
// url: http://localhost:23629/chicks-death-update/:id
// method: PUT
const chicksDeathUpdate = async (req, res) => {
    try {

        const { _id, id2, death, reason, time, date } = req.body;

        // find user from Database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // update death count
        const temp = {
            _id: ObjectId(_id),
            id2,
            death,
            reason,
            time,
            date
        }
        const _deathUpdate = await User.findOneAndUpdate(
            { email: _user.email, 'die_chicks.id2': req.params.id },
            { $set: { 'die_chicks.$': temp } },
            { new: true }
        )

        if (!_deathUpdate) return res.status(400).json({ message: 'death chicks update failed.' })
        
        return res.status(200).json({
            message: 'chicks death updated succesfylly.',
            deathChicks: _deathUpdate.die_chicks
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}



// chicks death delete
// url: http://localhost:23629/chicks-death-delete/:id
// method: PUT
const chicksDeathDelete = async (req, res) => {
    try {

        // find user from Database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not found.' })


        // delete death chicks
        const _deleteDeathChicks = await User.findOneAndUpdate(
            { email: _user.email },
            { $pull: { die_chicks: { _id: ObjectId(req.params.id) } } },
            { new: true }
        )

        // if not deleted
        if (!_deleteDeathChicks) return res.status(400).json({ message: 'chicks delete failed' })

        // if success
        return res.status(200).json({
            message: 'Death chicks delete succesfull.',
            deathChicks: _deleteDeathChicks.die_chicks
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}



module.exports = {
    chicksBuy,
    chicksUpdate,
    chicksDelete,
    chicksDeath,
    chicksDeathUpdate,
    chicksDeathDelete
}