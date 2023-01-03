const mongoose = require("mongoose")
const validator = require("validator")

module.exports = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxlength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should be greater than 4 characters"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            validate: [validator.isEmail, "Please enter valid email address"]
        },
        password: {
            type: String,
            required: [true, "Please enter your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        role: {
            type: String,
            default: "user"
        },
        resetPasswordToken: String,
        resetPasswordTokenExpire: Date,
    })
)