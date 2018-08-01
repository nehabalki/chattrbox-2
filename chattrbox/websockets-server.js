var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var topic = "";
var ws = new WebSocketServer({
  port: port
});

var messages = [];

console.log("websockets server started"); // eslint-disable-line

ws.on("connection", function(socket) {
  console.log("client connection established"); // eslint-disable-line

  if (topic) {
    socket.send("*** Topic is '" + topic + "'");
  }

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);  // eslint-disable-line

    var sendMsgToClient = "";

    if (data.startsWith("/topic")) {
      topic = data.split("/topic")[1].trim();
      sendMsgToClient = "*** Topic has changed to '" + topic + "'";
    } else {
      sendMsgToClient = data;
      messages.push(sendMsgToClient);
    }


    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(sendMsgToClient);
    });
    //socket.send(data);
  });
});
