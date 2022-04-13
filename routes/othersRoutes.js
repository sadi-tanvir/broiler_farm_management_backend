const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth.js")
const { othersCost, othersCostUpdate, othersCostDelete } = require("../controller/othersController.js")


// others cost add item
router.put('/others-cost', auth, othersCost)

// others cost delete item
router.put('/others-cost-delete/:id', auth, othersCostDelete)


// others cost updates
router.put('/others-cost-update/:id', auth, othersCostUpdate)




module.exports = router;