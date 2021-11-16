const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth.js")
const { feedBringing, feedDelete, feedUpdate, feedFinish, feedFinishDelete, feedFinishUpdate } = require('../controller/feedController.js')



// feed bringing
router.put('/feed-bringing', auth, feedBringing)

// feed delete
router.put('/feed-delete/:id', auth, feedDelete)

// feed update
router.put('/feed-update/:id', auth, feedUpdate)

// finish feed
router.put('/feed-finish', auth, feedFinish)

// finish feed delete
router.put('/feed-finish-delete/:id', auth, feedFinishDelete)

// finish feed update
router.put('/feed-finish-update/:id', auth, feedFinishUpdate)





module.exports = router