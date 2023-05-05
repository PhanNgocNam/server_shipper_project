const { default: mongoose } = require("mongoose");
const HistoryOrder = require("../models/historyModel");
const order = require("../models/orderModel");

// Add an order to an existing historyorder for a shipper
module.exports.addToHistoryOrder = async (req, res) => {
  const { orderId } = req.body;
  const { shipperId } = req.params;
  try {
    let historyOrder = await HistoryOrder.findOneAndUpdate(
      { shipperId },
      { $addToSet: { orders: orderId } },
      { new: true, upsert: true }
    );
    res.json(historyOrder);
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

module.exports.getHistoryOrderByShipperIdAndDate = async (req, res) => {
  const { shipperId } = req.params;
  const dateAdded = req.query.dateAdded;

  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate(
      "orders"
    );
    if (!historyOrder) {
      return res.json({ message: "Không tìm thấy shiper!" });
    }

    const dataInDate = historyOrder.orders.filter(
      (or) => or.dateAdded === dateAdded
    );
    const numOfTotal = dataInDate.length;
    const numOfSucess = dataInDate.filter(
      (or) => or.status === "thanhcong"
    ).length;
    const numOfFailure = dataInDate.filter(
      (or) => or.status === "thatbai"
    ).length;
    const numOfInHold = dataInDate.filter(
      (or) => or.status === "tamgiu"
    ).length;

    res.json({ numOfTotal, numOfSucess, numOfFailure, numOfInHold });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
