const express = require("express");
const router = express.Router();
const { addOneOrder } = require("../controllers/orderController");
const { getListOrderByStatus } = require("../controllers/orderController");
const { getOrderByOrderId } = require("../controllers/orderController");
const { getAllOrder } = require("../controllers/orderController");
const { getListOrderByStorage } = require("../controllers/orderController");
router.post("/new", addOneOrder);
router.get("/getAllOrder", getAllOrder);
router.get("/listOrderStatus", getListOrderByStatus);
router.get("/id/:id", getOrderByOrderId);
router.get("/getListOrderByStorage", getListOrderByStorage);

module.exports = router;
