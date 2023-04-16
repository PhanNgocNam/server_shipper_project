const { default: mongoose } = require("mongoose");
const HistoryOrder = require("../models/heldOrderModel");

// Create a history order for a shipper
module.exports.createHistoryOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    const historyOrder = await HistoryOrder.create({
      shipperId,
      orders: [new mongoose.Types.ObjectId(orderId)],
    });
    res.json(historyOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add an order to an existing history Order for a shipper
module.exports.addToHistoryOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId });
    if (!historyOrder) {
      // create new historyOrder with the orderId
      const newHistoryOrder = new HistoryOrder({
        shipperId,
        orders: [new mongoose.Types.ObjectId(orderId)],
      });
      await newHistoryOrder.save();
      return res.json(newHistoryOrder);
    } else {
      // check if the orderId already exists in historyOrder
      if (historyOrder.orders.includes(orderId)) {
        return res.json(historyOrder);
      }
      historyOrder.orders.push(new mongoose.Types.ObjectId(orderId));
      await historyOrder.save();
      return res.json(historyOrder);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Remove an order from a history Order for a shipper
module.exports.removeFromHistoryOrder = async (req, res) => {
  const { orderId } = req.params;
  const { shipperId } = req.query;
  try {
    const historyOrder = await HistoryOrder.findOneAndUpdate(
      { shipperId },
      { $pull: { orders: { orderId } } },
      { new: true }
    );
    if (!historyOrder) {
      res.status(404).json({ message: "Held order not found." });
    } else {
      res.json(historyOrder);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all held orders for a shipper
module.exports.getHistoryOrderByShipperId = async (req, res) => {
  const { shipperId } = req.params;
  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate(
      "orders"
    );
    res.json(historyOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
