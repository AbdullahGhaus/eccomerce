const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

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