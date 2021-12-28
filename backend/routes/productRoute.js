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
  .route("/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    isAuthenticatedUser,
    createProduct
  );
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
