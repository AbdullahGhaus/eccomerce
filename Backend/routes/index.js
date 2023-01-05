const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const products = require('./productRoute')
const users = require('./userRoute')
const router = express.Router();

router.use('/products', products)
router.use('/users', users)


module.exports = router;
