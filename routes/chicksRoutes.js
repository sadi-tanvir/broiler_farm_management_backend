const express = require("express")
const router = express.Router()
const { chicksBuy, chicksUpdate, chicksDelete, chicksDeath, chicksDeathUpdate,chicksDeathDelete } = require("../controller/chicksController.js")
const { auth } = require("../middleware/auth.js")



// chicks buy route
router.put('/chicks-buy', auth, chicksBuy)

// chicks Update route
router.put('/chicks-update', auth, chicksUpdate)

// chicks Update route
router.put('/chicks-delete', auth, chicksDelete)



// chicks death route
router.put('/chicks-death', auth, chicksDeath)

// chicks death update
router.put('/chicks-death-update/:id', auth, chicksDeathUpdate)


// chicks death delete
router.put('/chicks-death-delete/:id', auth, chicksDeathDelete)






module.exports = router