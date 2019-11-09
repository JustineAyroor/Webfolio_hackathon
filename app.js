var express = require('express')

var app = express()
var port = process.env.PORT || 4000

app.get("/", function(req, res){
    res.send("Hello Welcome to webfolio")
})

app.listen(port, function(){
    console.log("App running")
})