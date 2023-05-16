const mongoose = require("mongoose");

const heldOrderSchema = new mongoose.Schema({
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipper",
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    // validate: [(orders) => orders.length <= 10, "Maximum held orders is 10"],
    ref: "order",
    required: true,
  },
});

module.exports = mongoose.model("HeldOrder", heldOrderSchema);
