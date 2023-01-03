const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

//Register A User

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    let { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"SampleID",
            url:"SampleUrl"
        }
    })

    res.status(200).json({
        success:true,
        user,
    })
})