const mongoose = require("mongoose")


const url = `mongodb://localhost:27017/The-chicken-project`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDb Connected.`))
    .catch(error => console.log(error))