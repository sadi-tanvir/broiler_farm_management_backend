const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth.js")
const { othersCost, othersCostData, othersCostDelete } = require("../controller/othersController.js")


// others cost
router.put('/others-cost', auth, othersCost)

// others cost delete item
router.put('/others-cost-delete/:id', auth, othersCostDelete)


// get others cost data
router.get('/others-cost-data', auth, othersCostData)




module.exports = router;