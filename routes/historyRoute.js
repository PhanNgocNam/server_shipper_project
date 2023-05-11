const express = require("express");
const router = express.Router();

const {
  getHistoryOrderByShipperId,
  addToHistoryOrder,
  removeFromHistoryOrder,
  getHistoryOrderByShipperIdAndDate,
  getSalarry,
} = require("../controllers/historyController");

router.post("/addToHistoryOrder/:shipperId", addToHistoryOrder);
router.delete("/removeFromHistoryOrder", removeFromHistoryOrder);
router.get(
  "/getHistoryOrderByShipperId/:shipperId",
  getHistoryOrderByShipperId
);
router.get(
  `/getHistoryOrderByShipperIdAndDate/:shipperId`,
  getHistoryOrderByShipperIdAndDate
);
router.get(`/getSallary/:shipperId`, getSalarry);

module.exports = router;
