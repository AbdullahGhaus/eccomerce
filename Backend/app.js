const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const baseRoute = require('./routes')
app.use(express.json())
app.use(cookieParser())

//Middlewares
const errorMiddleware = require("./middleware/error")

// Route imports

app.use("/api/v1", baseRoute)

//Error MiddleWare
app.use(errorMiddleware)


module.exports = app;