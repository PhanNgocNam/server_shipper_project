const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  license: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    required: false,
  },
  blxURL: {
    type: String,
    required: false,
  },
  cccdURL: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("shipper", shipperSchema);
