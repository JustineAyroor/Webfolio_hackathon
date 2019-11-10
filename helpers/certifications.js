var db = require("../models")

exports.certificatesView = function(req, res){
    db.WebFolio.findById(req.params.id)
    .then(function(webFolio){
        res.send(webFolio.certifications)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.pushCertificate = function(req, res){
    db.WebFolio.findById(req.params.id)
    .then(function(webFolio){
        var certificate = {
            name: req.body.name,
            year: req.body.year
        }
        webFolio.certifications.push(certificate)
        webFolio.save()
        .then(function(certificate){
            res.send(certificate)
        })
        .catch(function(err){
            console.log(err)
        })
    })
}

exports.certificatesPut = function(req, res){
    db.WebFolio.findOneAndUpdate({_id: req.params.id, "certifications.name": req.body.name},
    {
        "$set":{
            "certifications.$.name": req.body.newName,
            "certifications.$.year": req.body.newYear
        }
    },{new: true})
    .then(function(webFolio){
        res.send(webFolio.certifications)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.certificatesDelete = function(req, res){
    db.WebFolio.update({_id: req.params.id},
        {"$pull":{"certifications": {"name": req.body.name}}}, {safe:true, multi: true})
    .then(function(){
        db.WebFolio.findById(req.params.id)
        .then(function(webFolio){
            res.send(webFolio.certifications)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}



/// TODO:
// Add route in app.js