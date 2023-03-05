const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 5,
  },
  isFirstLogin: {
    type: Boolean,
    require: true,
    default: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
