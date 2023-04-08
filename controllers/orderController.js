// const order = require("../models/orderModel");
const order = require("../models/orderModel");
const shipper = require("../models/shipperModel");
module.exports.addOneOrder = async (req, res) => {
  const {
    deliveryAddress,
    phoneReceive,
    storage,
    coords,
    orderName,
    status,
    weight,
    shipperId,
  } = req.body;

  try {
    // Kiểm tra shipper có tồn tại không
    const shipper = await shipper.findById(shipperId);
    if (!shipper) {
      return res.status(400).json({ message: "Invalid shipper ID" });
    }
    // Tạo mới đơn hàng
    const newOrder = new order({
      deliveryAddress,
      phoneReceive,
      storage,
      coords,
      orderName,
      status,
      weight,
      shipperId,
    });

    // Lưu đơn hàng vào database
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getListOrderByStatus = async (req, res) => {
  const { status } = req.query;
  try {
    const listOrder = await order.find({
      status: status,
    });

    res.json(listOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.getOrderByOrderId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await order.findOne({ _id: id });
    if (order) {
      res.json(order);
    } else {
      res.json({ message: "Không tìm thấy đơn hàng." });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// lọc theo kho hàng
module.exports.getListOrderByStorage = async (req, res) => {
  const { storage } = req.query;
  try {
    const listOrder = await order.find({
      storage: storage,
    });

    res.json(listOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.getAllOrder = async (req, res) => {
  try {
    const listOrder = await order.find();
    res.json(listOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};
