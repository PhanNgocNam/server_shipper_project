module.exports = function socketIO(io) {
  io.on("connection", (socket) => {
    console.log("New connection from: " + socket.id);

    socket.on("track_location", (data) => {
      console.log(data);
    });
    // shiper hủy đơn hàng
    socket.on("tra_het_don_hang", (data) => {
      console.log(data);
    });
  });
};
