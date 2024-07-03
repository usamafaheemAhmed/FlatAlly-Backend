const Mongoose = require("mongoose");

const User = new Mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    Roll: {
        type: String,
        default: "Employee",
    },
});

module.exports = Mongoose.model("User", User);