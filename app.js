var express = require('express')

var app = express()
var port = process.env.PORT || 4000

var educationRoutes = require("./routes/education")
var workExpRoutes = require("./routes/workExp")

app.use("/api/education", educationRoutes)
app.use("/api/work", workExpRoutes)

app.get("/xyz", function(req, res){
    res.send("sent xyz from app")
})

app.get("/", function(req, res){
    res.send("Hello Welcome to webfolio")
})

app.listen(port, function(){
    console.log("App running")
})