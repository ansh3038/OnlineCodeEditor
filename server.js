const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);
const ACTIONS = require("./app/actions/index");

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {

  io.to(socket.id).emit('socketID', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    console.log("join ",roomId);
    userSocketMap[socket.id] = username;
    // console.log(userSocketMap);
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    // console.log(clients);
    clients.forEach(({ socketId }) => {
      // console.log(socketId," ")
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });

  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code, socketId }) => {
    console.log("code change",roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(socket.id);//
    // const otherSocketIds = new Set([...clients].filter((id) => id != socket.id));
    // console.log(otherSocketIds);
    // otherSocketIds.forEach((socketId) => {
      socket.broadcast.to(roomId).emit("codeset", { code });
    // });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

httpServer.listen(5000, () => console.log("Listening on Port 5000"));
