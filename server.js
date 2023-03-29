require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRouter");
const shipperRoute = require("./routes/shipperRoute");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use("/auth/admin", adminRoute);
app.use("/order", orderRoute);
app.use("/shipper", shipperRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
