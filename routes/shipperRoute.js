const express = require("express");
const router = express.Router();
const { addOneShipper } = require("../controllers/shipperController");

router.post("/new", addOneShipper);

module.exports = router;
