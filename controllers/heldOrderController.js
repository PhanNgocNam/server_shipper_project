const { default: mongoose } = require("mongoose");
const HeldOrder = require("../models/heldOrderModel");
const order = require("../models/orderModel");
const ObjectId = require("mongoose").Types.ObjectId;

// Add an order to an existing held order for a shipper
module.exports.addToHeldOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    const listOrders = await HeldOrder.findOne({ shipperId }).populate(
      "orders"
    );
    if (!listOrders) {
      const heldOrder = await HeldOrder.create({
        shipperId,
        orders: [orderId],
      });
      return res.json(heldOrder);
    }
    if (listOrders.orders.includes(orderId)) {
      return res.json(listOrders);
    }
    if (listOrders.orders.length >= 10) {
      return res.status(400).json({ message: "Đủ" });
    }
    listOrders.orders.push(orderId);
    await listOrders.save();
    res.json(listOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove an order from a held order for a shipper
module.exports.removeFromHeldOrder = async (req, res) => {
  const { shipperId, orderId } = req.params;

  try {
    const result = await HeldOrder.findOneAndUpdate(
      { shipperId },
      { $pull: { orders: new ObjectId(orderId) } },
      { new: true }
    );

    if (result) {
      return res.json(result);
    }
    return res.status(400).json({ message: "false" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
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

    // update status of orders in the held order
    for (const orderId of heldOrder.orders) {
      const foundOrder = await order.findOneAndUpdate(
        { _id: orderId },
        { status: status }
      );
    }

    // update status of held order
    heldOrder.status = status;
    heldOrder.orders = [];
    await heldOrder.save();

    res.json({ message: "Cập nhật thành công." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
