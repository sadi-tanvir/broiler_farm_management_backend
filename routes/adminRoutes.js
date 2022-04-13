const express = require("express")
const router = express.Router()
const { allUserDelete,allUserUpdate } = require("../controller/adminController.js")
const { auth, checkRole } = require("../middleware/auth.js")


// all user information delete
router.delete('/all-user-delete/:id', auth, checkRole(['admin']), allUserDelete)


// all user information Update
router.patch('/all-user-update/:id', auth, checkRole(['admin']), allUserUpdate)


module.exports = router