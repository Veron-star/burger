var bodyParser = require("body-parser");
var express = require("express");
var exhandle = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3006;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", 
exhandle({ 
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/layout/"
 }));

app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");
app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});