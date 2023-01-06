const express = require("express");

const products = require('./productRoute')
const users = require('./userRoute')
const router = express.Router();

router.use('/products', products)
router.use('/user', users)


module.exports = router;
