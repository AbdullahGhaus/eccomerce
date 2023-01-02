const e = require("express")
const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    let error = errors[err.message] || getThirdPartyErrors(err) || errors['Error']
    
    //Handling Mongodb Wring ID Error
    if(err.name === "CastError"){
        const message = `Resource Not Found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    res.status(error.status).json({
        success: false,
        message: error.message
    })
}


const errors = {
    "NotFound": {
        message: "Product not Found",
        status: 404
    },
    "Error": {
        message: "Error",
        status: 400
    }
}

const getThirdPartyErrors = (err) => {
    return { message: err.message, status: 500 }
}