const shipper = require("../models/shipperModel");

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
    const newShipper = new shipper({
      fullName,
      phoneNumber,
      storage,
      license,
      avatarURL,
      cccdURL,
      blxURL,
    });

    await newShipper.save();
    res.json(newShipper);
  } catch (err) {
    res.json({ message: err.message });
  }
};
