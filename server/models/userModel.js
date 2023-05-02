var mongoose = require("mongoose");
var Schema = mongoose.Schema;




const userschema = new Schema({
    name: {
        type: String,
        required: [true, "Insert your Name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Insert your Email"]
    },
    password: {
        type: String,
        required: [true, "Insert your Email"]

    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const usersModel = mongoose.model("user", userschema);


module.exports = usersModel;