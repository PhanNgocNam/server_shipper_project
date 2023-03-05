const adminModel = require("../models/adminModel");
module.exports.finOne = async (req, res, next) => {
  try {
    const adminWantToFind = await adminModel.findOne({
      username: req.body.username,
    });
    if (!adminWantToFind) {
      return res
        .status(400)
        .json({ status: "false", message: "Tên đăng nhập không đúng!" });
    } else {
      res.admin = adminWantToFind;
      next();
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};
