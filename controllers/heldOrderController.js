const { default: mongoose } = require("mongoose");
const HeldOrder = require("../models/heldOrderModel");

// Create a held order for a shipper
module.exports.createHeldOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    const heldOrder = await HeldOrder.create({
      shipperId,
      orders: [new mongoose.Types.ObjectId(orderId)],
    });
    res.json(heldOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add an order to an existing held order for a shipper
module.exports.addToHeldOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    const heldOrder = await HeldOrder.findOneAndUpdate(
      { shipperId },
      { $push: { orders: new mongoose.Types.ObjectId(orderId) } },
      { new: true }
    );
    res.json(heldOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove an order from a held order for a shipper
module.exports.removeFromHeldOrder = async (req, res) => {
  const { orderId } = req.params;
  const { shipperId } = req.query;
  try {
    const heldOrder = await HeldOrder.findOneAndUpdate(
      { shipperId },
      { $pull: { orders: { orderId } } },
      { new: true }
    );
    if (!heldOrder) {
      res.status(404).json({ message: "Held order not found." });
    } else {
      res.json(heldOrder);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all held orders for a shipper
module.exports.getHeldOrdersByShipperId = async (req, res) => {
  const { shipperId } = req.params;
  try {
    const heldOrders = await HeldOrder.find({ shipperId }).populate("orders");
    res.json(heldOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
