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
            git: req.body.git,
            basic_wf_styles:{
                font_body: req.body.font_body,
                font_title: req.body.font_title,
                font_header: req.body.font_header,
                font_quotes: req.body.font_quotes
            }
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
    }, {new: true})
    .then(function(webFolio){
        res.send(webFolio)
    })
    .catch(function(err){
        console.log(err)
    })
}
