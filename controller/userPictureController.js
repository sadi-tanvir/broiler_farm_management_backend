const multer = require("multer")
const User = require("../models/User.js")
const randomString = require("randomstring")
const path = require("path")
const fs = require('fs')
const moment = require("moment")




// profile pic upload
// url: http://localhost:23629/profile-pic-upload
// method: POST

// profile storage
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profile-pic/')
    },
    filename: (req, file, cb) => {
        let p1 = randomString.generate(5)
        let p2 = randomString.generate(5)
        let ext = (path.extname(file.originalname)).toLowerCase()

        let fullName = `${p1}_${p2}${ext}`
        cb(null, fullName)
    }
})

// profile upload callback function
const profilePicUpload = async (req, res, next) => {
    // if file field empty
    if (!req.file) {
        return res.status(400).json({ message: 'INPUT FIELD IS EMPTY.' })
    }

    // find user from database
    const _user = await User.findOne({ email: req.user.email })

    // update profile picture to database
    const temp = {
        profile_pic: req.file.filename,
        updatedAt: moment().format("DD/MM/YYYY") + " - " + moment().format("hh:mm:ss")
    }
    const _profileUpload = await User.findOneAndUpdate({ email: _user.email }, { $set: temp }, { new: true })

    if (_user.profile_pic != 'empty-avatar.png') {
        fs.unlinkSync(`./public/profile-pic/${_user.profile_pic}`)
    }

    // success
    return res.status(200).json({
        message: 'PROFILE PICTURE UPLOADED SUCCESSFULLY.',
        user: {
            name: _profileUpload.name,
            email: _profileUpload.email,
            phone: _profileUpload.phone,
            role: _profileUpload.role,
            profile_pic: _profileUpload.profile_pic,
            cover_pic: _profileUpload.cover_pic
        }
    })
}





// cover pic upload
// url: http://localhost:23629/cover-pic-upload
// method: POST

// profile storage
const coverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/cover-pic/')
    },
    filename: (req, file, cb) => {
        let p1 = randomString.generate(5)
        let p2 = randomString.generate(5)
        let ext = (path.extname(file.originalname)).toLowerCase()

        let fullName = `${p1}_${p2}${ext}`
        cb(null, fullName)
    }
})

// profile upload callback function
const coverPicUpload = async (req, res) => {
    // if file field empty
    if (!req.file) {
        return res.status(400).json({ message: 'INPUT FIELD IS EMPTY.' })
    }

    // find user from database
    const _user = await User.findOne({ email: req.user.email })

    // update profile picture to database
    const temp = {
        cover_pic: req.file.filename,
        updatedAt: moment().format("DD/MM/YYYY") + " - " + moment().format("hh:mm:ss")
    }
    const _coverUpload = await User.findOneAndUpdate({ email: _user.email }, { $set: temp }, { new: true })

    if (_user.cover_pic !== 'empty-cover-pic.jpg') {
        fs.unlinkSync(`./public/cover-pic/${_user.cover_pic}`)
    }

    // success
    return res.status(200).json({
        message: 'COVER PHOTO UPLOADED SUCCESSFULLY.',
        user: {
            name: _coverUpload.name,
            email: _coverUpload.email,
            phone: _coverUpload.phone,
            role: _coverUpload.role,
            profile_pic: _coverUpload.profile_pic,
            cover_pic: _coverUpload.cover_pic
        }
    })
}


module.exports = {
    profileStorage,
    profilePicUpload,
    coverStorage,
    coverPicUpload
}