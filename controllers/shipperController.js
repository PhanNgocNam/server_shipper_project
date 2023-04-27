const shipper = require("../models/shipperModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.addOneShipper = async (req, res) => {
  const {
    fullName,
    phoneNumber,
    storage,
    license,
    avatarURL,
    cccdURL,
    blxURL,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(phoneNumber, salt);

    const newShipper = new shipper({
      fullName,
      phoneNumber,
      storage,
      license,
      avatarURL,
      cccdURL,
      blxURL,
      password: hashedPassword,
    });
    await newShipper.save();

    // Perform sign-up logic here
    const token = jwt.sign({ id: newShipper._id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.updateShiper = async (req, res) => {
  try {
    let targetShipper = await shipper.findOne({ _id: req.params.id });
    targetShipper.fullName = req.body.fullName;
    targetShipper.storage = req.body.storage;
    targetShipper.license = req.body.license;
    targetShipper.phoneNumber = req.body.phoneNumber;
    targetShipper.password = req.body.password;
    await targetShipper.save();
    res.json({ status: "success", shiper: targetShipper });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports.getAllShippers = async (req, res) => {
  try {
    const shippers = await shipper.find();
    res.json(shippers);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.shipperLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    // Check if shipper exists
    const existingShipper = await shipper.findOne({ phoneNumber });
    if (!existingShipper) {
      return res.status(400).json({ message: "Shipper does not exist" });
    } else {
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(
        password,
        existingShipper.password
      );
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        // res.json({ shipper: existingShipper });
        const token = jwt.sign(
          {
            phoneNumber: existingShipper.phoneNumber,
            username: existingShipper.fullName,
            shipperId: existingShipper._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        // Return the token and shipper info to the client
        res.json({
          token,
          shipper: existingShipper.toJSON(),
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.shipperUpdatePassword = async (req, res) => {
  const { shipperId } = req;
  const { currentPassword, newPassword } = req.body;
  try {
    const shipper = await shipper.findById(shipperId);
    const isMatch = await shipper.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Mật khẩu hiện tại không chính xác" });
    }

    shipper.password = newPassword;
    await shipper.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.deleteShipperById = async (req, res) => {
  try {
    const deletedShipper = await shipper.findByIdAndDelete(req.params.id);
    if (!deletedShipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }
    res.json({
      status: "success",
      message: "Xóa shipper thành công",
      data: deletedShipper,
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};
