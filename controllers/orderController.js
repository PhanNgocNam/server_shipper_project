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
  const { orderId } = req.params; // lấy orderId từ params

  try {
    const order = await Order.findOne({ orderId: orderId }); // tìm đơn hàng bằng orderId
    if (order) {
      res.json(order); // trả về đơn hàng nếu tìm thấy
    } else {
      res.json({ message: "Không tìm thấy đơn hàng." });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};
