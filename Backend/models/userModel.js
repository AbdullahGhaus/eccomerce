const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
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
    images: {
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

// ================ METHODS ===================

//Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Comparing Entered and Database Password for login
userSchema.methods.comparePassword = async function (PasswordInput) {
    return await bcrypt.compare(PasswordInput, this.password)
}

//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex"); //Creating a random token

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex") //Hashing and adding that token to userSchema

    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('User', userSchema)