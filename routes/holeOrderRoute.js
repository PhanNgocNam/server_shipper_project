const express = require("express");
const router = express.Router();

const {
  createHeldOrder,
  addToHeldOrder,
  removeFromHeldOrder,
  getHeldOrdersByShipperId,
  updateHeldOrderStatus,
} = require("../controllers/heldOrderController");

router.post("/addHeldOrder/:shipperId", addToHeldOrder);
router.delete("/removeHeldOrder/:shipperId", removeFromHeldOrder);
router.get("/getHeldOrdersByShipperId/:shipperId", getHeldOrdersByShipperId);
router.patch("/updateAll", updateHeldOrderStatus);

module.exports = router;
