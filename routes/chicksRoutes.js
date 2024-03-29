const express = require("express")
const router = express.Router()
const { chicksBuy, chicksUpdate, chicksSalesInfo, chicksDelete, chicksDeath, chicksDeathUpdate, chicksDeathDelete, chicksSalesSummary, chicksSalesSummaryDelete, chicksSalesSummaryUpdate } = require("../controller/chicksController.js")
const { auth } = require("../middleware/auth.js")



// chicks buy route
router.put('/chicks-buy', auth, chicksBuy)

// chicks Update route
router.put('/chicks-update', auth, chicksUpdate)

// chicks delete route
router.put('/chicks-delete', auth, chicksDelete)

// chicks sales status
router.put('/chicks-sales-info', auth, chicksSalesInfo)


// chicks death route
router.put('/chicks-death', auth, chicksDeath)

// chicks death update
router.put('/chicks-death-update/:id', auth, chicksDeathUpdate)

// chicks death delete
router.put('/chicks-death-delete/:id', auth, chicksDeathDelete)

// add chicks sales summary
router.put('/chicks-sales-summary', auth, chicksSalesSummary)

// delete add chicks sales summary
router.put('/chicks-sales-summary-delete/:id', auth, chicksSalesSummaryDelete)

// update add chicks sales summary
router.put('/chicks-sales-summary-update/:id', auth, chicksSalesSummaryUpdate)



module.exports = router