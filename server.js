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
const historyOrderRoute = require("./routes/historyRoute");
app.use(express.json());
const socketIO = require("./socket");

app.use(cors());

app.use("/auth/admin", adminRoute);
app.use("/order", orderRoute);
app.use("/shipper", shipperRoute);
app.use("/holeOrder", holeOrderRoute);
app.use("/historyOrder", historyOrderRoute);

mongoose
  .connect(process.env.MONGO_URL_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://192.168.1.102:19000",
      "http://localhost:3000",
      // "https://gobadelivery.netlify.app",
      process.env.WEB_CLIENT_URL,
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
    } else {
      shipperData.push(data);
    }

    console.log(shipperData);
    socket.broadcast.emit("receive-location", shipperData);
  });

  socket.on("foregroundMode", (data) => {
    const index = shipperData.findIndex(
      (shipper) => shipper.shipperID === data
    );
    if (index !== -1) {
      shipperData.splice(index, 1);
    }

    socket.broadcast.emit("receive-location", shipperData);
  });

  socket.on("disconnect", (data) => {
    console.log(data);
  });

  // socket cập nhật order khi order trong kho thay đổi
  socket.on("join_room", (shipper) => {
    socket.join(shipper.storage);
  });

  socket.on("change_order_list", (room_id) => {
    // console.log(room_id);
    socket.to(room_id).emit("update_order_list");
  });

  // socket.on("return_order", (room_id) => {
  //    console.log(room_id);
  //   socket.to(room_id).emit("update_order_list");
  // })
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
