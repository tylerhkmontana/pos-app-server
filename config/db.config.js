const mongoose = require("mongoose")
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/posApp"

const connection = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log("DB CONNECTED"))
}

module.exports = connection

