const express = require("express");
const router = express.Router();

const {
  createHeldOrder,
  addToHeldOrder,
  removeFromHeldOrder,
  getHeldOrdersByShipperId,
  updateHeldOrderStatus,
} = require("../controllers/heldOrderController");

router.put("/addHeldOrder/:shipperId", addToHeldOrder);
router.delete("/removeHeldOrder", removeFromHeldOrder);
router.get("/getHeldOrdersByShipperId/:shipperId", getHeldOrdersByShipperId);
router.patch("/updateAll", updateHeldOrderStatus);

module.exports = router;
