const express = require("express");
const router = express.Router();
const {
  addOneOrder,
  getListOrderByStatus,
  getAllOrder,
  getListOrderByStorage,
  getOrderByOrderId,
  updateOneOrder,
  deleteOneOrder,
  changeOrderStatus,
} = require("../controllers/orderController");

router.post("/new", addOneOrder);
router.get("/getAllOrder", getAllOrder);
router.get("/listOrderStatus", getListOrderByStatus);
router.get("/id/:id", getOrderByOrderId);
router.get("/getListOrderByStorage/:storage", getListOrderByStorage);
router.put("/updateOneOrder/:id", updateOneOrder);
router.delete("/deleteOneOrder/:id", deleteOneOrder);
router.patch("/idChange/:id/", changeOrderStatus);

module.exports = router;
