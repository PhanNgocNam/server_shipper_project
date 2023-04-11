const express = require("express");
const router = express.Router();
const {
  addOneOrder,
  getListOrderByStatus,
  getAllOrder,
  getListOrderByStorage,
  getOrderByOrderId,
} = require("../controllers/orderController");

router.post("/new", addOneOrder);
router.get("/getAllOrder", getAllOrder);
router.get("/listOrderStatus", getListOrderByStatus);
router.get("/id/:id", getOrderByOrderId);
router.get("/getListOrderByStorage/:storage", getListOrderByStorage);

module.exports = router;
