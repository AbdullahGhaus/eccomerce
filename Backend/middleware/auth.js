const ErrorHandler = require("..//utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login to access this resource", 401))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id); // saving user to req.user in order to get user from req anytime
    next()

})

exports.authorizeRoles = (...roles) => (req, res, next) => {
    let { role } = req.user;
    console.log(role, roles)
    if (!roles.includes(role))
        throw new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)
    next();
}   