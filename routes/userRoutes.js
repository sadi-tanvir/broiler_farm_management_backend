const express = require("express")
const router = express.Router()
const { register, activeAccount, login, allUserDelete, changeUserInfo } = require("../controller/userController.js")
const { auth, checkRole } = require("../middleware/auth.js")

// register route
router.post('/register', register)

// active account
router.get('/activeAccount/:token', activeAccount)

// login route
router.post('/login', login)

// change user information
router.patch('/change-user-info', auth, changeUserInfo)

// // all user information delete
// router.delete('/all-user-delete/:id', auth, checkRole(['admin']), allUserDelete)


module.exports = router