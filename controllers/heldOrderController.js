const { default: mongoose } = require("mongoose");
const HeldOrder = require("../models/heldOrderModel");
const order = require("../models/orderModel");

// Add an order to an existing held order for a shipper
module.exports.addToHeldOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    let heldOrder = await HeldOrder.findOne({ shipperId });
    if (!heldOrder) {
      heldOrder = new HeldOrder({
        shipperId,
        orders: [new mongoose.Types.ObjectId(orderId)],
      });
    } else {
      if (heldOrder.orders.includes(orderId)) {
        return res.json(heldOrder);
      }
      heldOrder.orders.push(new mongoose.Types.ObjectId(orderId));
    }
    await heldOrder.save();
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
    const heldOrders = await HeldOrder.findOne({ shipperId }).populate(
      "orders"
    );
    res.json(heldOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update status of orders in a held order for a shipper
module.exports.updateHeldOrderStatus = async (req, res) => {
  const { shipperId, status } = req.body;
  try {
    const heldOrder = await HeldOrder.findOne({ shipperId }).populate("orders");

    if (!heldOrder) {
      return res.status(404).json({ message: "Không tìm thấy held order." });
    }

    heldOrder.orders.forEach(async (orderId) => {
      try {
        await order.findByIdAndUpdate(orderId, { status: status });
      } catch (err) {
        console.log(err);
      }
    });

    heldOrder.set({ orders: [] });
    heldOrder.status = status;
    await heldOrder.save();

    res.json({ message: "Cập nhật thành công." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
