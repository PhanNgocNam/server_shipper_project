const express = require("express");
const router = express.Router();

const {
  createHistoryOrder,
  getHistoryOrderByShipperId,
  addToHistoryOrder,
  removeFromHistoryOrder,
} = require("../controllers/historyController");

router.post("/createHistoryOrder/:shipperId", createHistoryOrder);
router.put("/addHeldOrder/:shipperId", addToHistoryOrder);
router.delete("/removeHeldOrder", removeFromHistoryOrder);
router.get("/getHeldOrdersByShipperId/:shipperId", getHistoryOrderByShipperId);

module.exports = router;
