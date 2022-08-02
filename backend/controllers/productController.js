const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  if (req.body.price < 0) {
    return next(new ErrorHander("Price cannot be negative, 404"));
  } else if (req.body.Stock < 0) {
    return next(new ErrorHander("Stock cannot be negative, 404"));
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // const resultPerPage = 50;
  const productsCount = await Product.countDocuments();
  const allProducts = await Product.find();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    // .searchbyDept()
    .filter();
  // .pagination(resultPerPage);
  // const products = await apiFeature.query;

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    allProducts,
    // resultPerPage,
    filteredProductsCount,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

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

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully !",
  });
});
