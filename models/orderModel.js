const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  deliveryAddress: {
    type: String,
    require: true,
  },
  phoneReceive: {
    type: String,
    require: true,
  },
  storage: {
    type: String,
    require: true,
  },
  coords: {
    lng: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
  },
  orderName: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "inProgress",
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateDeliver: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
