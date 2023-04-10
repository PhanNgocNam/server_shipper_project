require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRoute");
const shipperRoute = require("./routes/shipperRoute");
const holeOrderRoute = require("./routes/holeOrderRoute");
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.88.111:1900",
      "exp://192.168.88.111:19000",
    ],
    methods: "*",
  })
);

app.use("/auth/admin", adminRoute);
app.use("/order", orderRoute);
app.use("/shipper", shipperRoute);
app.use("/holeOrder", holeOrderRoute);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
