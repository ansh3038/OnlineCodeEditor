const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);
const ACTIONS = require('./app/actions/index');

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
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    io.to(roomId).emit(ACTIONS.JOINED, {
      clients,
      username,
      socketId: socket.id,
    });
  });

  socket.on(ACTIONS.CODE_CHANGE,({roomId,code}) =>{
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
  })

  socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) =>{
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code});
  });




});

httpServer.listen(5000, ()=> console.log('Listening on Port 5000'));