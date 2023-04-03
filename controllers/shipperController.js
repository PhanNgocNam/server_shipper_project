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
    password,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    const token = jwt.sign({ id: newShipper._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(
      password,
      existingShipper.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign a token
    const token = jwt.sign(
      {
        phoneNumber: existingShipper.phoneNumber,
        username: existingShipper.fullName,
        shipperId: existingShipper._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token to the client
    res.json({ token });
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
    res.json({ message: "Xóa shipper thành công", data: deletedShipper });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
