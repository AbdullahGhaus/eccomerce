const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
    .get('/',
        isAuthenticated,
        authorizeRoles("admin"),
        getAllProducts)
    .post("/new",
        isAuthenticated,
        createProduct)
    .put("/:id",
        isAuthenticated,
        updateProduct)
    .delete(isAuthenticated, deleteProduct)
    .get(getProductDetails)

module.exports = router;
