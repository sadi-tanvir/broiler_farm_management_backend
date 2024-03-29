const dotenv = require("dotenv")
dotenv.config()
const User = require('../models/User.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../middleware/sendEmail.js")
const randomString = require("random-string");



// register route
// url: http://localhost:23629/register
// method: POST
const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // field validation
        if (!name || !email || !phone || !password) return res.status(400).json({ message: 'FILL UP YOUR DATA CORRECTLY.' })

        // if user already registered
        const isUserExist = await User.findOne({ email })
        if (isUserExist) return res.status(400).json({ message: 'THE USER ALREADY EXISTS.' })

        // hash password
        const hashPassword = await bcrypt.hash(password, 10)

        // token
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1d' })

        // send email for authentication
        sendEmail(email, token)

        // create new user
        const id_p1 = randomString({ length: 4, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p2 = randomString({ length: 4, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const id_p3 = randomString({ length: 4, numeric: false, letters: true, special: false, exclude: ['a', 'b', '1'] });
        const _user = new User({
            userId: id_p1 + id_p2 + id_p3,
            name,
            email,
            phone,
            password: hashPassword,
            authToken: token
        })
        // if not registered
        const new_user = await _user.save()

        // register success 
        if (!new_user) return res.status(400).json({ message: 'register failed.' })

        return res.status(201).json({
            message: 'USER-CREATED SUCCESSFULLY.',
            token,
            new_user
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// active account
// url: http://localhost:23629/activeAccount
// method: GET
const activeAccount = async (req, res) => {
    try {

        const _user = await User.findOne({ authToken: req.params.token })
        if (!_user) return res.status(400).json({ message: 'User not found.' })

        _user.account_Confirmed = true
        _user.authToken = 'Account activated'

        const saveChange = await _user.save()

        // any problem
        if (!saveChange) return res.status(400).json({ message: 'user data not saved.' })

        // after successfully activated
        return res.status(200).json({ message: 'You have successfully done your job.' })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};




// login route
// url: http://localhost:23629/login
// method: POST
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email, !password) return res.status(400).json({ message: 'Fill Up your Data correctly.' })

        // find user from database
        const _user = await User.findOne({ email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'Invalid Details.' })

        // check user account status
        if (_user.account_Confirmed === false) {
            return res.status(400).json({ message: 'Your Account hasn\'t been activated. please go to your email and active your account first.' })
        }

        // match password
        const isMatchPass = await bcrypt.compare(password, _user.password)
        if (!isMatchPass) return res.status(400).json({ message: 'Invalid Details.' })

        // generate token
        const token = jwt.sign({ email: _user.email }, process.env.SECRET_KEY, { expiresIn: '7d' })


        // find all user from database
        const _allUser = await User.find()

        const allUseremail = _allUser.map((singleUser) => {
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
            }
        })


        // if the password has been matched.
        return res.status(200).json({
            message: 'User login successfully.',
            token: token,
            users: allUseremail,
            user: {
                userId: _user.userId,
                name: _user.name,
                email: _user.email,
                password: _user.password,
                phone: _user.phone,
                role: _user.role,
                profile_pic: _user.profile_pic,
                cover_pic: _user.cover_pic,
                createdAt: _user.createdAt
            },
            buyChicken: _user.Bring_chicks,
            deathChickens: _user.die_chicks,
            buyFeed: _user.feed,
            finishFeed: _user.finishFeed,
            buyMedicine: _user.medicine,
            othersCost: _user.others,
            role: _user.role,
            sales_info: _user.sales_info,
            salesSummary: _user.salesSummary
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
};



// change user information
// url: http://localhost:23629/change-user-info
// method: patch
const changeUserInfo = async (req, res) => {
    try {

        const { name, phone, oldPassword, newPassword } = req.body;

        // find user from database
        const _user = await User.findOne({ email: req.user.email })

        // if user not found
        if (!_user) return res.status(400).json({ message: 'Invalid Details.' })

        // math old password
        const isMathPass = await bcrypt.compare(oldPassword, _user.password)
        // if password doesn't match 
        if (!isMathPass) return res.status(400).json({ message: 'Password doesn\'t match' })

        // hash password
        const hashPassword = await bcrypt.hash(newPassword, 10)
        if (!hashPassword) return res.status(400).json({ message: 'Password hash failed.' })


        // update user information
        const temp = {
            name,
            phone,
            password: hashPassword
        }
        const _changeUserInfo = await User.findOneAndUpdate(
            { email: _user.email },
            { $set: temp },
            { new: true }
        )

        if (!_changeUserInfo) return res.status(400).json({ message: 'User Info Update Failed.' })

        // if success
        return res.status(200).json({
            message: 'User Info Updated Successfully..',
            user: {
                name: _changeUserInfo.name,
                email: _changeUserInfo.email,
                phone: _changeUserInfo.phone,
                role: _changeUserInfo.role,
                profile_pic: _changeUserInfo.profile_pic,
                cover_pic: _changeUserInfo.cover_pic,
                createdAt: _changeUserInfo.createdAt,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Database Error',
            error
        })
    }
}





module.exports = {
    register,
    activeAccount,
    login,
    changeUserInfo,
}