const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const SOCKET_PORT = process.env.PORT || 3005;
let connectedUsers = 0;

io.on("connection", (socket) => {
  console.log("first time",connectedUsers);

  if (connectedUsers >= 2) {
    console.log("returning rfom here");
    return null;
  }

  console.log("one of the users");
  connectedUsers += 1;
  console.log(connectedUsers);

  if (connectedUsers === 1) {
    socket.emit("setPlayerTwo");
  }

  function getGameRandomNumber() {
    let randomNumber = parseInt(Math.random() * 100, 10);
    if (randomNumber < 2) this.getGameRandomNumber();
    else return randomNumber;
  }

  if (connectedUsers === 2) {
    console.log(connectedUsers);
    socket.emit("setPlayerOne");

    io.emit("action", {
      isGameStart: true,
      turnArray: [
        {
          id: 0,
          player: "playerOne",
          value: getGameRandomNumber(),
        },
      ],
      turnCount: 0,
    });
  }

  socket.on("action", (action) => {
    io.emit("action", action);
  });

  socket.on("disconnect", () => {
    connectedUsers -= 1;
    console.log("user disconnected");
    console.log(connectedUsers);
  });
});

http.listen(SOCKET_PORT, () => {
  console.log("listening on *:" + SOCKET_PORT);
});
