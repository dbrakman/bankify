let express = require("express");
let app     = express();
let server  = require("http").Server(app);

global.logAction = function(msg){ console.log(" > "  + msg); };
global.logResult = function(msg){ console.log("  - " + msg); };

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));
app.use(express.static(__dirname + '/client'));


// Notify of server connection
server.listen(2000);
console.log("Server started");

//let io = require("socket.io")(server, {});
