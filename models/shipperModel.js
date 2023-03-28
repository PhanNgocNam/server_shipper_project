const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  storage: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  license: {
    type: String,
    require: true,
  },
  avatarURL: {
    type: String,
    require: true,
  },
  blxURL: {
    type: String,
    require: true,
  },
  cccdURL: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("shipper", shipperSchema);
