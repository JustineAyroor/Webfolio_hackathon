var express = require('express')
var router = express.Router()
var WebFolio = require("../models/webfolio")
var User = require("../models/user")


router.get("/get/:id", function(req, res){
    WebFolio.findById(req.params.id,"user title objective linkdn git", function(err, WebFolio){
        if(err) console.log(err)
        else{
            res.send(WebFolio)
        }
    })
})

router.post("/create/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) console.log(err)
        else{
            WebFolio.create({
                user: user,
                title: req.body.title,
                objective: req.body.objective,
                linkdn: req.body.linkdn,
                git: req.body.git
            }, function(err, WebFolio){
                if(err) console.log(err)
                else{
                    res.send(WebFolio)
                }
            })
        }
    })
})

router.put("/update/:id", function(req, res){
    WebFolio.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        objective: req.body.objective,
        linkdn: req.body.linkdn,
        git: req.body.git
    }, ).exec(function(err, WebFolio){
        if(err) console.log(err)
        else{
            res.send(WebFolio)
        }
    })
})

module.exports = router;
