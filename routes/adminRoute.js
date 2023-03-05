const express = require("express");
const router = express.Router();
const { finOne } = require("../middlewares/findOne");
const mongoose = require("mongoose");
const {
  login,
  register,
  resetPassword,
} = require("../controllers/adminController");

router.post("/login", login);
router.post("/register", register);
router.patch("/resetPW", finOne, resetPassword);
module.exports = router;
