const mongoose = require("mongoose");

const historyOrderSchema = new mongoose.Schema({
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipper",
    required: true,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "order",
    required: true,
  },
});

module.exports = mongoose.model("HistoryOrder", historyOrderSchema);
