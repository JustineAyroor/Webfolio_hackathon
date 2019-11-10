var db = require("../models")

exports.tskillsView = function(req, res){
    db.WebFolio.findById(req.params.id)
    .then(function(webfolio){
        res.send(webfolio.tSkills)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.tskillsPush = function(req, res){
    db.WebFolio.findById(req.params.id)
    .then(function(webfolio){
        var tskill = {
            name: req.body.name,
            level: req.body.level
        }
        webfolio.tSkills.push(tskill)
        webfolio.save()
        .then(function(tskill){
            res.send(tskill)
        })
        .catch(function(err){
            console.log(err)
        })
    })
}

exports.tskillsPut = function(req, res){
    db.WebFolio.findOneAndUpdate({_id: req.params.id, "tSkills.name": req.body.name},
    {
        "$set":{
            "tSkills.$.name": req.body.newName,
            "tSkills.$.level": req.body.newLevel
        }
    }, {new: true})
    .then(function(webfolio){
        res.send(webfolio.tSkills)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.tskillsDelete = function(req, res){
    db.WebFolio.update({_id: req.params.id}, 
        {"$pull": {"tSkills": {"name": req.body.name}}},{safe:true, multi:true})
    .then(function(){
        db.WebFolio.findById(req.params.id)
        .then(function(webfolio){
            res.send(webfolio.tSkills)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}