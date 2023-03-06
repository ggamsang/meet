


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("/home/ubuntu/place/front/dist/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/message", (req, res) => {
	res.send("ffsd");
});
app.post("/messages", (req, res) => {
	console.log(req.body);
	io.emit("message", req.body);
	res.sendStatus(200);

});
io.on("connection", (socket) => {
	console.log("a user is connected: ",socket.id);
	socket.emit("welcom",socket.id);
	
});
const server = http.listen(3000, () => {
	console.log("server is running on port: ", server.address().port);
});
