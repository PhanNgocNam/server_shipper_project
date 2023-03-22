const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  licensePlates: { type: String, required: true },
  avatar: { type: String, required: true },
  identityCard: { type: String, required: true },
  rank: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now() },
  shipperID: { type: String, unique: true, required: true },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

const Shipper = mongoose.model("Shipper", shipperSchema);

module.exports = Shipper;
