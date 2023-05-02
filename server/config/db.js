var mongoose = require("mongoose")

mongoose.set('strictQuery', "true")

const connectDB = () => {
    try {
        const con = mongoose.connect(process.env.MONGO_DB)
        console.log("connection with DataBase Success....")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB 