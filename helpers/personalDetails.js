var db = require("../models")

exports.pdView = function(req, res){
    db.WebFolio.findById(req.params.id).populate("education")
    .then(function(webfolio){
        res.json(webfolio)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.pdPush = function(req, res){
    db.User.findById(req.params.id)
    .then(function(user){
        db.WebFolio.create({
            user: user,
            title: req.body.title,
            objective: req.body.objective,
            linkdn: req.body.linkdn,
            git: req.body.git
        })
        .then(function(WebFolio){
                res.send(WebFolio)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.pdPut = function(req, res){
    db.WebFolio.findByIdAndUpdate(req.params.id,
    {
            title: req.body.title,
            objective: req.body.objective,
            linkdn: req.body.linkdn,
            git: req.body.git
    })
    .then(function(webFolio){
        res.send(webFolio)
    })
    .catch(function(err){
        console.log(err)
    })
}
