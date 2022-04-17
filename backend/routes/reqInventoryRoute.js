const express = require("express");
const {
  createReqInventory,
  getSingleRequest,
  getAllRequest,
  deleteRequest,
  updateRequest,
  myRequests,
} = require("../controllers/reqInventoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/reqInventory/new").post(isAuthenticatedUser, createReqInventory);
router.route("/reqInventory/:id").get(isAuthenticatedUser, getSingleRequest);
router.route("/requests/me").get(isAuthenticatedUser, myRequests);

router
  .route("/admin/requests")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getAllRequest);

router
  .route("/admin/request/:id")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateRequest)
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteRequest);

module.exports = router;
