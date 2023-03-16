const express = require("express");
const router = express.Router();
const { addOneOrder } = require("../controllers/orderController");

router.post("/new", addOneOrder);

module.exports = router;
