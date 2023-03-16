const order = require("../models/orderModel");

module.exports.addOneOrder = async (req, res) => {
  const { deliveryAddress, phoneReceive, storage, coords, orderName } =
    req.body;
  try {
    const newOrder = new order({
      deliveryAddress,
      phoneReceive,
      storage,
      coords,
      orderName,
    });

    await newOrder.save();
    res.json({ message: "Success!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
