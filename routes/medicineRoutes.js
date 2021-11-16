const express = require("express")
const router = express.Router()
const { medicineBuy, medicineDelete, medicineUpdate } = require("../controller/medicineController.js")
const { auth } = require("../middleware/auth.js")



// medicine buy route
router.put('/medicine-buy', auth, medicineBuy)


// medicine delete route
router.put('/medicine-delete/:id', auth, medicineDelete)


// medicine update route
router.put('/medicine-update/:id', auth, medicineUpdate)




module.exports = router