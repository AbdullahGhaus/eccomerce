const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")


//Register A User
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    let { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "SampleID",
            url: "SampleUrl"
        }
    })

    sendToken(user, 201, res);
})

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) return new ErrorHandler("Please Enter Email or Password", 401) // Checking if user has given password and email both

    const user = await User.findOne({ email }).select("+password") // find user according to email and password

    if (!user) return new ErrorHandler("Incorrect Email or Password", 401) //Checking if email and password are correct

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) return new ErrorHandler("Incorrect Email or Password", 401) //Checking if Password is correct or not.

    sendToken(user, 200, res)
})


//Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})


//Forgot Password 
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) throw new ErrorHandler("User Noe Found", 404);

    const resetToken = user.getResetPasswordToken() //Getting resetPasswordToken

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const resetPasswordMessage = `Your password reset url is :- \n\n${resetPasswordUrl}\n\nIf you havn
    t requested, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recvery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return new ErrorHandler(error.message, 500)
    }

})