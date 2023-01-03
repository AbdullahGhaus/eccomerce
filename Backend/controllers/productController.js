const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");


//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 5
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage)
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    TotalProducts: productCount
  });
});

//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) throw new Error('NotFound')

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) throw new Error('NotFound')

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) throw new Error('NotFound')

  res.status(200).json({
    success: true,
    product,
  });
});