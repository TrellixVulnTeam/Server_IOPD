const express = require("express");
const { requireSignin, adminMiddleware } = require("../../middleware");
const OrderAdminController = require("../../app/controllers/Admin/OrderAdminController");
const router = express.Router();

router.post(`update`, requireSignin, adminMiddleware, OrderAdminController.updateOrder);
router.post(
  `getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  OrderAdminController.getCustomerOrders
);

module.exports = router;