const order = require("../models/orderModel");

module.exports.addOneOrder = async (req, res) => {
  const {
    deliveryAddress,
    phoneReceive,
    storage,
    coords,
    orderName,
    dateAdded,
    dateDeliver,
    status,
    weight,
  } = req.body;
  try {
    // Tạo mới đơn hàng
    const newOrder = new order({
      deliveryAddress,
      phoneReceive,
      storage,
      coords,
      orderName,
      dateAdded,
      dateDeliver,
      status,
      weight,
    });
    await newOrder.save();
    res.json({ message: "Success!" });
  } catch (err) {
    res.json({ message: err.message });
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
    const foundOrder = await order.findOne({ _id: id });
    if (foundOrder) {
      res.json(foundOrder);
    } else {
      res.json({ message: "Không tìm thấy đơn hàng." });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// lọc theo kho hàng
module.exports.getListOrderByStorage = async (req, res) => {
  const { storage } = req.params;
  const { status } = req.query;
  try {
    const listOrder = await order.find({
      storage: storage,
      status: status,
    });

    res.json(listOrder);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// thay đổi status
module.exports.changeOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const foundOrder = await order.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    if (foundOrder) {
      res.json(foundOrder);
    } else {
      res.json({ message: "Không tìm thấy đơn hàng." });
    }
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
