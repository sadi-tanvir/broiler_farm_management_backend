const dotenv = require("dotenv")
dotenv.config()
const moment = require("moment")
const User = require("../models/User.js")
const ObjectId = require("mongodb").ObjectId
const randomString = require("random-string")


// feed bringing
// url: http://localhost:23629/feed-bringing
// method: PUT
const feedBringing = async (req, res) => {
    try {

        const { name, category, bag, price } = req.body;



        // find user from database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not foud.' })


        // update bag
        const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const temp = {
            _id: ObjectId(),
            id2: id_p1 + id_p2,
            name,
            category,
            bag,
            price,
            date: moment().format("DD/MM/YYYY")
        }
        const updateFeed = await User.findOneAndUpdate({ email: _user.email }, { $push: { feed: temp } }, { new: true })

        // if update failed
        if (!updateFeed) return res.status(400).json({ message: 'Feed bag updating failed.' })


        // if success
        return res.status(200).json({
            message: 'Feed Details Added Successfylly.',
            buyFeed: updateFeed.feed
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// feed delete
// url: http://localhost:23629/feed-delete
// method: PUT
const feedDelete = async (req, res) => {
    try {
        // find user from database
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete processing
        const _deleteFeed = await User.findOneAndUpdate({ email: _user.email, }, { $pull: { feed: { _id: ObjectId(req.params.id) } } }, { new: true })

        if (!_deleteFeed) { return res.status(400).json({ message: 'Feed Delete failed.' }) }

        return res.status(200).json({
            message: 'Feed Delete Successfull.',
            buyFeed: _deleteFeed.feed
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}




// feed update
// url: http://localhost:23629/feed-update
// method: PUT
const feedUpdate = async (req, res) => {
    try {

        const { _id, id2, name, category, bag, price, date } = req.body;

        // find user from database
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete processing
        const temp = {
            _id: ObjectId(_id),
            id2,
            name,
            category,
            bag,
            price,
            date
        }
        const _updateFeed = await User.findOneAndUpdate({ email: _user.email, 'feed.id2': req.params.id }, { $set: { 'feed.$': temp } }, { new: true })

        if (!_updateFeed) { return res.status(400).json({ message: 'Feed Update failed.' }) }

        return res.status(200).json({
            message: 'Feed Update Successfull.',
            buyFeed: _updateFeed.feed
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}


// finish feed
// url: http://localhost:23629/feed-finish
// method: PUT
const feedFinish = async (req, res) => {
    try {

        const { name, category, bag } = req.body;


        // find user from database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'User not foud.' })


        // update bag
        const id_p1 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 8, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const temp = {
            _id: ObjectId(),
            id2: id_p1 + id_p2,
            name,
            category,
            bag,
            date: moment().format("DD/MM/YYYY")
        }
        const updateFinishFeed = await User.findOneAndUpdate({ email: _user.email }, { $push: { finishFeed: temp } }, { new: true })

        // if update failed
        if (!updateFinishFeed) return res.status(400).json({ message: 'Finish Feed update failed.' })


        // if success
        return res.status(200).json({
            message: 'Finish Feed Details Successfylly.',
            finishFeed: updateFinishFeed.finishFeed
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// finish feed delete
// url: http://localhost:23629/feed-finish-delete/:id
// method: PUT
const feedFinishDelete = async (req, res) => {
    try {
        // find user from database
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete processing
        const _deleteFinishFeed = await User.findOneAndUpdate({ email: _user.email, }, { $pull: { finishFeed: { _id: ObjectId(req.params.id) } } }, { new: true })

        if (!_deleteFinishFeed) { return res.status(400).json({ message: 'Finish Feed Delete failed.' }) }

        return res.status(200).json({
            message: 'Finish Feed Delete Successfull.',
            finishFeed: _deleteFinishFeed.finishFeed
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// finish feed update
// url: http://localhost:23629/feed-finish-update/:id
// method: PUT
const feedFinishUpdate = async (req, res) => {
    try {

        const { _id, id2, name, category, bag, date } = req.body;

        // find user from database
        const _user = await User.findOne({ email: req.user.email })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        // delete processing
        const temp = {
            _id: ObjectId(_id),
            id2,
            name,
            category,
            bag,
            date
        }
        const _updateFinishFeed = await User.findOneAndUpdate({ email: _user.email, 'finishFeed.id2': req.params.id }, { $set: { 'finishFeed.$': temp } }, { new: true })

        if (!_updateFinishFeed) { return res.status(400).json({ message: 'Finish Feed Update failed.' }) }

        return res.status(200).json({
            message: 'Finish Feed Update Successfull.',
            finishFeed: _updateFinishFeed.finishFeed
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}

module.exports = {
    feedBringing,
    feedDelete,
    feedUpdate,
    feedFinish,
    feedFinishDelete,
    feedFinishUpdate
}