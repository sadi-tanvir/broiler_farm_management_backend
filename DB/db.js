const mongoose = require("mongoose")
require("dotenv").config()

// const url = `mongodb://localhost:27017/The-chicken-project`
const url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.jnizw.mongodb.net/BROILER-FIRM-PROJECT?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDb Connected.`))
    .catch(error => console.log(error))