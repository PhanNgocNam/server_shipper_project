const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const {
  addOneShipper,
  getAllShippers,
} = require("../controllers/shipperController");

router.get("/all", getAllShippers);
router.post("/new", addOneShipper);

=======
const {
  addOneShipper,
  getAllShippers,
  shipperLogin,
  deleteShipperById,
  updateShiper,
} = require("../controllers/shipperController");

router.post("/login", shipperLogin);
router.post("/new", addOneShipper);
router.put("/updateOne/:id", updateShiper);
router.get("/all", getAllShippers);
router.delete("/:id", deleteShipperById);
>>>>>>> 52f12405eec439ea41a9c1b84ebbb94a326e0359
module.exports = router;
