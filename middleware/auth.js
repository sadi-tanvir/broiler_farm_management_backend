const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")
const secret_key = process.env.SECRET_KEY



// authentication token
const auth = (req, res, next) => {
    // request token from header
    const token = req.headers['x-access-token']

    // verify token
    jwt.verify(token, secret_key, async (error, decoded) => {
        try {
            if (error) return res.status(400).json({ message: 'Unauthorized User Token.', error })
            console.log(error);

            // if token has been verified
            const _user = await User.findOne({ email: decoded.email })
            if (!_user) return res.status(400).json({ message: 'User not found.' })

            // if user has been found. 
            req.user = _user
            req.user = {
                id: _user._id,
                name: _user.name,
                email: _user.email,
                phone: _user.phone,
                role: _user.role
            }

            // go for the next step
            return next()

        } catch (error) {
            return res.status(500).json({
                message: 'Database Error',
                error
            })
        }
    })
}




// user role management
const checkRole = roles => (req, res, next) => {
    return !roles.includes(req.user.role) ? res.status(401).json({ message: `Unauthorized user` }) : next()
}

module.exports = {
    auth,
    checkRole
}