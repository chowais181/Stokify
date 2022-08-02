const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/vendorProductController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/vendorproducts").get(getAllProducts);

router.route("/admin/vendorproducts").get(isAuthenticatedUser, getAdminProducts);

router
  .route("/admin/vendorproduct/new")
  .post(isAuthenticatedUser, createProduct);

router
  .route("/admin/vendorproduct/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

router.route("/vendorproduct/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
