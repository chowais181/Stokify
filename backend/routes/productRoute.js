const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  getAdminProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    createProduct
  );
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, getAdminProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
