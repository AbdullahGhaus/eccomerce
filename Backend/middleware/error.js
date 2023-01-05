const e = require("express")
const ErrorHandler = require("../utils/errorHandler")

// module.exports = (err, req, res, next) => {
//     console.log("Runs first")
//     let error = errors[err.message] || getThirdPartyErrors(err) || errors['Error']

//     //Handling Mongodb Wrong ID Error
//     if (err.name === "CastError") {
//         const message = `Resource Not Found. Invalid: ${err.path}`
//         err = new ErrorHandler(message, 400)
//     }
//     res.status(error.status).json({
//         success: false,
//         message: error.message
//     })
// }


// const errors = {
//     "NotFound": {
//         message: "Product not Found",
//         status: 404
//     },
//     "Error": {
//         message: "Error",
//         status: 400
//     },
//     "NullEP": {
//         message: "Please Enter Email & Password Both",
//         status: 401
//     },
//     "WrongEP": {
//         message: "Incorrect Email or Password",
//         status: 401
//     },
// }

// const getThirdPartyErrors = (err) => {
//     return { message: err.message, status: 500 }
// }

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success: false,
        message: message
    })
}