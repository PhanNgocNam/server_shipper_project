const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipper",
    required: true,
  },
  status: { type: String, required: true },
  distance: { type: Number, required: true },
  timeDeliver: { type: Date, required: true },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
