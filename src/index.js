require("dotenv").config();
const express = require("express");
// const { createClient } = require("redis");
// const { createAdapter } = require("@socket.io/redis-adapter");
// const pubClient = createClient({ url: process.env.REDIS_SERVER });
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_SERVER,
    credentials: true,
  },
  // adapter: createAdapter({
  //   pubClient,
  //   subClient: pubClient.duplicate(),
  // }),
});
const PORT = process.env.PORT || 3000;

// app.get("/", (_, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// 参加時のイベント
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("hi", "everyone");
  // メッセージ送信
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // 退出時のイベント
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
