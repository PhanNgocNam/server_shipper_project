const express = require("express");
const router = express.Router();
const {
  addOneShipper,
  getAllShippers,
  shipperLogin,
  deleteShipperById,
} = require("../controllers/shipperController");

router.post("/login", shipperLogin);
router.post("/new", addOneShipper);
router.get("/all", getAllShippers);
router.delete("/:id", deleteShipperById);
module.exports = router;
