const User = require("../models/User.js")
const moment = require("moment")
const ObjectId = require("mongodb").ObjectId;
const randomString = require("random-string")




// others cost
// url: http://localhost:23629/others-cost
// method: PUT
const othersCost = async (req, res) => {
    try {

        const { category, name, tk } = req.body;

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // use duplicate variable for checking category allready exist or not
        var duplicate = false;

        // check category exist or not
        if (_user.others.length) {
            _user.others.map(cat => {
                // if category exist, then duplicate value will be updated true
                if (cat.category == category.toLowerCase()) {
                    duplicate = true
                }
            })
        }

        // if category has been not created allready
        if (!duplicate) {
            // create category
            const createCategory = await User.findOneAndUpdate(
                { email: _user.email },
                { $push: { others: { category: category.toLowerCase(), rent: [] } } }
            )
            // if category not created
            if (!createCategory) return res.status(400).json({ message: 'category create failed.' })

            // if category has created already , then value will update
            if (createCategory) {
                // update inside the category value
                const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
                const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
                const rentObj = {
                    _id: ObjectId(),
                    id2: id_p1 + id_p2,
                    name,
                    tk,
                    date: moment().format("DD/MM/YYYY")
                }
                const updateRent = await User.findOneAndUpdate(
                    { email: _user.email, 'others.category': category.toLowerCase() },
                    { $push: { 'others.$.rent': rentObj } }
                )
                // if category value not updated
                if (!updateRent) return res.status(400).json({ message: 'rent update failed.' })
            }

            // if all process successfully done
            return res.status(200).json({ message: 'category create successfully...' })

        } else { // if category allready exists, then this code will run
            // update inside the existing category
            const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
            const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
            const rentObj = {
                _id: ObjectId(),
                id2: id_p1 + id_p2,
                name,
                tk,
                date: moment().format("DD/MM/YYYY")
            }
            const updateRent = await User.findOneAndUpdate({ email: _user.email, 'others.category': category.toLowerCase() }, { $push: { 'others.$.rent': rentObj } })
            if (!updateRent) return res.status(400).json({ message: 'rent update failed.' })
            return res.status(200).json({ message: 'rent update successfylly...' })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};


// others cost delete item
// url: http://localhost:23629/others-cost-delete/:id
// method: PUT
const othersCostDelete = async (req, res) => {
    try {

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        const _deleteOthersItem = await User.findOneAndUpdate(
            { email: _user.email },
            { $pull: { others: { 'rent.$': { _id: ObjectId(req.params.id) } } } }
        )

        if (!_deleteOthersItem) return res.status(400).json({ message: 'Others Item delete failed.' })

        // { email: _user.email, 'others.rent._id': ObjectId(req.params.id) },
        // { $pull: { others: { 'rent.$': { _id: ObjectId(req.params.id) } } } }
        

        return res.status(200).json({
            message: 'Deleted Successfully.',
            _deleteOthersItem: _deleteOthersItem.others
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}



// get others cost data
// url: http://localhost:23629/others-cost-data
// method: GET
const othersCostData = async (req, res) => {
    try {

        // find user from data base
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })


        // total others cost
        const totalCostArr = _user.others.map(allCat => {
            return allCat.rent.map(allCost => {
                return allCost.tk
            })
        })

        const mergeTotalCostArr = totalCostArr.reduce((pre, cur) => {
            return [...pre, ...cur]
        })

        const totalCost = mergeTotalCostArr.reduce((pre, cur) => pre + cur)



        return res.status(200).json({
            totalCost,
            all_category: _user.others
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}


module.exports = {
    othersCost,
    othersCostData,
    othersCostDelete
}