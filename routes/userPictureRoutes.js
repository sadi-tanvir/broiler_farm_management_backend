const express =require('express')
const router = express.Router()
const { auth } =require("../middleware/auth.js")
const { profileStorage, profilePicUpload, coverStorage, coverPicUpload } =require("../controller/userPictureController.js")
const multer =require("multer")




// profile pic upload
const uploadProfile = multer({ storage: profileStorage })
router.post('/profile-pic-upload', auth, uploadProfile.single('profile_pic'), profilePicUpload)


// cover pic upload
const uploadCover = multer({ storage: coverStorage })
router.post('/cover-pic-upload', auth, uploadCover.single('cover_pic'), coverPicUpload)



module.exports = router;