const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
    .get('/', getAllProducts)
    .post("/new", isAuthenticated, authorizeRoles("admin"), createProduct)
    .put("/:id", isAuthenticated, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails)

module.exports = router;
