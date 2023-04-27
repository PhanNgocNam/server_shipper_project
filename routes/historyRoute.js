const express = require("express");
const router = express.Router();

const {
  getHistoryOrderByShipperId,
  addToHistoryOrder,
  removeFromHistoryOrder,
} = require("../controllers/historyController");

router.post("/addToHistoryOrder/:shipperId", addToHistoryOrder);
router.delete("/removeFromHistoryOrder", removeFromHistoryOrder);
router.get(
  "/getHistoryOrderByShipperId/:shipperId",
  getHistoryOrderByShipperId
);

module.exports = router;
