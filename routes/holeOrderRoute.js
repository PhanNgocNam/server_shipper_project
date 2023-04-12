const express = require("express");
const router = express.Router();

const {
  createHeldOrder,
  addToHeldOrder,
  removeFromHeldOrder,
  getHeldOrdersByShipperId,
} = require("../controllers/heldOrderController");

router.post("/createHeldOrder/:shipperId", createHeldOrder);
router.put("/addHeldOrder/:shipperId", addToHeldOrder);
router.delete("/removeHeldOrder", removeFromHeldOrder);
router.get("/getHeldOrdersByShipperId/:shipperId", getHeldOrdersByShipperId);

module.exports = router;
