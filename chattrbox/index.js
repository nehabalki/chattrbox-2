var server = require("diet");
var fs = require("fs");
var wss = require("./websockets-server"); 
var app = server();
app.listen("http://localhost:8000");

var staticFile = require("diet-static")({
  path: app.path + "/app/"
});

app.view("file", staticFile);

app.missing(function($) {
  $.header("Content-Type", "text/html");
  $.status("404");
  fs.readFile(__dirname + "/app/error.html", function(error, content) {

    if (error) throw error;

    $.end(content.toString());
  });
});

//default webpage
app.get("/", function($) {
  $.redirect("index.html");
});

app.error(function($) {
  $.end($.statusCode + "\n" + $.statusMessage + "\n" + $.fail.error.message);
});
