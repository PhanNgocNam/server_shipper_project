const { default: mongoose } = require("mongoose");
const HistoryOrder = require("../models/historyModel");
const order = require("../models/orderModel");
const moment = require("moment");
const historyModel = require("../models/historyModel");

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
    await order.findOneAndUpdate(
      { _id: orderId },
      {
        dateDeliver: moment().format("DD/MM/YYYY HH:mm"),
        dateDelivered: moment().format("YYYY-MM-DD"),
        dateForSta: new Date(moment().format("YYYY-MM-DD")).setHours(
          0,
          0,
          0,
          0
        ),
      },
      { new: true }
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

// Get all history orders for a shipper
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

module.exports.getHistoryOrderByShipperIdForTableData = async (req, res) => {
  const { shipperId } = req.params;
  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate(
      "orders"
    );

    const list = historyOrder.orders.map((order) => {
      const {
        orderName,
        deliveryAddress,
        phoneReceive,
        storage,
        weight,
        status,
        dateAdded,
        dateDeliver,
      } = order;
      return {
        orderName,
        deliveryAddress,
        phoneReceive,
        storage,
        weight,
        status,
        dateAdded,
        dateDeliver,
      };
    });

    res.json({ orders: list });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.getHistoryOrderByShipperIdAndDate = async (req, res) => {
  const { shipperId } = req.params;
  const dateAdded2 = req.query.dateAdded; // 2023-12-05

  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate(
      "orders"
    );
    if (!historyOrder) {
      return res.json({ message: "Không tìm thấy shiper!" });
    }

    const dataInDate = historyOrder.orders.filter(
      (or) => or.dateDelivered === dateAdded2
    );

    const numOfTotal = dataInDate.length;
    const numOfSucess = dataInDate.filter(
      (or) => or.status === "thanhcong"
    ).length;
    const numOfFailure = dataInDate.filter(
      (or) => or.status === "thatbai"
    ).length;
    res.json({
      numOfTotal,
      numOfSucess,
      numOfFailure,
      orders: dataInDate.map((order) => {
        const {
          orderName,
          deliveryAddress,
          phoneReceive,
          storage,
          weight,
          status,
          dateAdded,
          dateDeliver,
        } = order;
        return {
          orderName,
          deliveryAddress,
          phoneReceive,
          storage,
          weight,
          status,
          dateAdded,
          dateDeliver,
        };
      }),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.getHistoryOrderBetweenTwoDate = async (req, res) => {
  const { shipperId } = req.params;
  const startDate = new Date(req.query.startDate).getTime();
  const endDate = new Date(req.query.endDate).getTime();
  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate(
      "orders"
    );
    if (!historyOrder) {
      return res.json({ message: "Không tìm thấy shiper!" });
    }

    const listOrderMatch = historyOrder.orders.filter(
      (order) =>
        order.dateForSta.getTime() >= startDate &&
        order.dateForSta.getTime() <= endDate
    );

    const numOfTotal = listOrderMatch.length;
    const numOfSucess = listOrderMatch.filter(
      (or) => or.status === "thanhcong"
    ).length;
    const numOfFailure = listOrderMatch.filter(
      (or) => or.status === "thatbai"
    ).length;

    if (listOrderMatch) {
      return res.json({
        numOfTotal,
        numOfSucess,
        numOfFailure,
        orders: listOrderMatch.map((order) => {
          const {
            orderName,
            deliveryAddress,
            phoneReceive,
            storage,
            weight,
            status,
            dateAdded,
            dateDeliver,
          } = order;
          return {
            orderName,
            deliveryAddress,
            phoneReceive,
            storage,
            weight,
            status,
            dateAdded,
            dateDeliver,
          };
        }),
      });
    } else {
      return res.json(
        "Không tìm thấy đơn hàng trong khoảng thời gian đã chọn!"
      );
    }
  } catch (err) {
    return res.json("Lỗi :" + err.message);
  }
};

// tính lương cho shipper theo tháng
module.exports.getSalarry = async (req, res) => {
  const { shipperId } = req.params;
  const month = req.query.month;
  let salarry = 5000000;
  let minWeight = 0;
  let mediumWeight = 0;
  let maxWeight = 0;
  try {
    const historyOrder = await HistoryOrder.findOne({ shipperId }).populate({
      path: "orders",
      match: { status: "thanhcong" },
    });
    if (!historyOrder) {
      return res.json({ message: "Không tìm thấy shipper!" });
    }
    historyOrder.orders
      .filter((item) => {
        const monthDelivered =
          moment(item.dateDeliver, "DD/MM/YYYY HH:mm").month() + 1;
        return Number(month) === monthDelivered;
      })
      .map((item) => {
        if (item.weight < 5) {
          salarry = salarry + 1000;
          minWeight = minWeight + 1;
        }
        if (item.weight < 5 && item.weight < 10) {
          salarry = salarry + 2000;
          mediumWeight = mediumWeight + 1;
        } else {
          salarry = salarry + 5000;
          maxWeight = maxWeight + 1;
        }
      });

    const falseOrder = await HistoryOrder.findOne({ shipperId }).populate({
      path: "orders",
      match: { status: "thatbai" },
    });
    const numOfFailure = falseOrder.orders.filter((item) => {
      const monthDelivered =
        moment(item.dateDeliver, "DD/MM/YYYY HH:mm").month() + 1;
      return Number(month) === monthDelivered;
    }).length;

    res.json({ salarry, maxWeight, minWeight, mediumWeight, numOfFailure });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
