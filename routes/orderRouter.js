const express = require("express");
const router = express.Router();
const { addOneOrder } = require("../controllers/orderController");
const { getListOrderByStatus } = require("../controllers/orderController");
const { getOrderByOrderId } = require("../controllers/orderController");

router.post("/new", addOneOrder);
router.get("/listOrderStatus", getListOrderByStatus);
router.get("/getOneByID", getOrderByOrderId);

module.exports = router;
