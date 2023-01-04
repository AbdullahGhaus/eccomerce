const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

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

    const userToken = user.getJwtToken();

    res.status(200).json({
        success: true,
        userToken,
    })
})

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) { return new Error("NullEP") } // Checking if user has given password and email both

    const user = await User.findOne({ email }).select("+password") // find user according to email and password

    if (!user) { return new Error("WrongEP") } //Checking if email and password are correct

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) return new Error("WrongEP") //Checking if Password is correct or not.

    const userToken = user.getJwtToken();

    res.status(200).json({
        success: true,
        userToken,
    })
})