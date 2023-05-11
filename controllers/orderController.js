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
    res.json({ newOrder, message: "Success!" });
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

module.exports.updateOneOrder = async (req, res) => {
  const { deliveryAddress, phoneReceive, storage, coords, orderName, weight } =
    req.body;
  try {
    let targetOrder = await order.findOne({ _id: req.params.id });
    targetOrder.deliveryAddress = deliveryAddress;
    targetOrder.storage = storage;
    targetOrder.orderName = orderName;
    targetOrder.phoneReceive = phoneReceive;
    targetOrder.weight = weight;
    targetOrder.coords = coords;
    await targetOrder.save();
    res.json({ status: "success", order: targetOrder });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.deleteOneOrder = async (req, res) => {
  try {
    const deleteOrder = await order.findByIdAndDelete(req.params.id);
    if (!deleteOrder) {
      return res.status(404).json({ message: "Không tìm thấy order" });
    }
    res.json({
      status: "success",
      message: "Xóa đon hàng thành công",
      data: deleteOrder,
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};
