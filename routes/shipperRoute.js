const express = require("express");
const router = express.Router();

const {
  addOneShipper,
  getAllShippers,
} = require("../controllers/shipperController");

router.get("/all", getAllShippers);
router.post("/new", addOneShipper);

module.exports = router;
