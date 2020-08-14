var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();

//serves static files
app.use(express.static("public"));

//parse application body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes and give the server access to them
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

//listen
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});