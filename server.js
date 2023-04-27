require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
mongoose.set("strictQuery", true);
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRoute");
const shipperRoute = require("./routes/shipperRoute");
const holeOrderRoute = require("./routes/holeOrderRoute");
app.use(express.json());
app.use(cors());

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
      "http://localhost:3000",
    ],
  },
});
let shipperData = [];
io.on("connection", (socket) => {
  console.log("New connection from: " + socket.id);

  socket.on("track_location", (data) => {
    const index = shipperData.findIndex(
      (shipper) => shipper.shipperID === data.shipperID
    );

    if (index !== -1) {
      shipperData.splice(index, 1, data);
      console.log("Đã thay thế bằng location mới nhất!");
    } else {
      shipperData.push(data);
      console.log("Shipper đã được thêm vào List!");
    }

    console.log(shipperData);
    socket.broadcast.emit("receive-location", shipperData);
  });

  socket.on("foregroundMode", (data) => {
    // if (shipperData.length >= 0) {
    const index = shipperData.findIndex(
      (shipper) => shipper.shipperID === data
    );
    if (index !== -1) {
      shipperData.splice(index, 1);
    }
    // console.log(updateShipperLocation);

    socket.broadcast.emit("receive-location", shipperData);
    // }
  });

  socket.on("disconnect", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
