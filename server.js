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
    origin: "http://192.168.1.170:19000",
  },
});

io.on("connection", (socket) => {
  console.log("New connection from: " + socket.id);

  socket.on("track_location", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
