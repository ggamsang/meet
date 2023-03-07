const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, process.env.LOCAL ? { cors: { origin: "http://127.0.0.1:8080"}}:{ pingTimeout: 60000,}) ;
const cors = require("cors");
console.log(process.env.LOCAL);
app.use(express.static("/home/ubuntu/place/front/dist/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/message", (req, res) => {
  res.send("ffsd");
});
app.post("/messages", (req, res) => {
  console.log(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});
io.on("connection", (socket) => {
  console.log("a user is connected: ", socket.id);
  socket.emit("welcom", socket.id);
  socket.on("sent", (data) => {
    console.log(data);
  });
});
const server = http.listen(3000, () => {
  console.log("server is running on port: ", server.address().port);
});
