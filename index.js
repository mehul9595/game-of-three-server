const express = require("express");
const http = require("http").Server(express);
const io = require("socketio")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
