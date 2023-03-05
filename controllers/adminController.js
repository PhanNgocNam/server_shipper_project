const adminUser = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await adminUser.findOne({ username });
    const checkPassResult = await bcrypt.compare(password, admin.password);

    if (!admin) {
      return res.json({ message: "Tên đằng nhập không đúng!", status: false });
    } else if (!checkPassResult) {
      return res.json({ message: "Mật khẩu không đúng!", status: false });
    } else {
      admin.save();
      return res.json({ status: true, admin });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.resetPassword = async (req, res) => {
  let { password } = res.admin;
  let { newPassword, confirmPassword } = req.body;
  if (newPassword && confirmPassword) {
    if (password === newPassword) {
      res.json({
        status: false,
        message: "Mật khẩu mới phải khác với mật khẩu cũ!",
      });
    } else {
      if (newPassword !== confirmPassword) {
        res.json({
          status: false,
          message: "Mật khẩu và nhập lại mật khẩu phải giống nhau!",
        });
      } else {
        res.admin.password = await bcrypt.hash(newPassword, 10);
        res.admin.isFirstLogin = false;
        await res.admin.save();
        res.json({ status: "true", admin: res.admin });
      }
    }
  }
};

module.exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = new adminUser({
      username,
      password,
    });
    await admin.save();
    res.json({ message: "Success!", admin });
  } catch (err) {
    res.json({ message: err.message });
  }
};
