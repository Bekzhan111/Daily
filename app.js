const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
var items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  var today = new Date();
  var options = {
    weekday : "long",
    day : "numeric",
    month : "long"
  }

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    itemVal: items
  });
})

app.post("/", function(req, res){
  if(req.body.button === "Work") {
    workItems.push(req.body.newitem);
    res.redirect("/work");
  }
  else{
    items.push(req.body.newitem);
    res.redirect("/");
  }
})

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    itemVal: workItems
  });
})

app.post("/work", function(req, res){
  workItems.push(req.body.newitem);
  res.redirect("/work");
})

app.listen(3000, function(){
  console.log("Server started");
})
