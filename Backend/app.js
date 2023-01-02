const express = require("express")
const app = express()
app.use(express.json())
//Middlewares
const errorMiddleware = require("./middleware/error")

// Route imports
const product = require("./routes/productRoute")

app.use("/api/v1", product)

//Error MiddleWare
app.use(errorMiddleware)


module.exports = app;