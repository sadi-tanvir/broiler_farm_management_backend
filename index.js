const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")

// component import
require("./DB/db.js")
const adminRoutes = require("./routes/adminRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const chicksRoute = require("./routes/chicksRoutes.js")
const feedRoutes = require("./routes/feedRoutes.js")
const medicineRoutes = require("./routes/medicineRoutes.js")
const othersRoutes = require("./routes/othersRoutes.js")
const userPictureRoutes = require("./routes/userPictureRoutes.js")

// custom variable
dotenv.config()
const app = express()
const port = process.env.PORT || 23629

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use(express.static('public'))

// routes define
app.use(adminRoutes)
app.use(userRoutes)
app.use(chicksRoute)
app.use(feedRoutes)
app.use(medicineRoutes)
app.use(othersRoutes)
app.use(userPictureRoutes)



// server listen
app.listen(port, () => {
    console.log(`The Server is running at port ${port}`);
})