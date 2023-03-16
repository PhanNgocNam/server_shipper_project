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
});

module.exports = mongoose.model("order", orderSchema);
