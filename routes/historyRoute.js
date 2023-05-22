const express = require("express");
const router = express.Router();

const {
  getHistoryOrderByShipperId,
  addToHistoryOrder,
  removeFromHistoryOrder,
  getHistoryOrderByShipperIdAndDate,
  getHistoryOrderBetweenTwoDate,
  getSalarry,
  getHistoryOrderByShipperIdForTableData,
} = require("../controllers/historyController");

router.post("/addToHistoryOrder/:shipperId", addToHistoryOrder);
router.delete("/removeFromHistoryOrder", removeFromHistoryOrder);
router.get(
  "/getHistoryOrderByShipperId/:shipperId",
  getHistoryOrderByShipperId
);

router.get(
  "/getHistoryOrderByShipperIdForTableData/:shipperId",
  getHistoryOrderByShipperIdForTableData
);
router.get(
  `/getHistoryOrderByShipperIdAndDate/:shipperId`,
  getHistoryOrderByShipperIdAndDate
);
router.get(
  "/getHistoryOrderBetweenTwoDate/:shipperId",
  getHistoryOrderBetweenTwoDate
);
router.get(`/getSallary/:shipperId`, getSalarry);

module.exports = router;
