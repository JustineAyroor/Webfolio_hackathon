var db = require("../models")

exports.certificatesView = function(req, res){
    
    db.WebFolio.findById(req.params.wfID)
    .then(function(webFolio){
        // var foundCert;
        var foundCert = webFolio.certifications.find(cert => cert._id == req.params.CertID);
        console.log(foundCert)
        // console.log(webFolio.certifications.find(cert => cert._id == req.params.CertID));
        res.send(foundCert)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.pushCertificate = function(req, res){
    db.WebFolio.findById(req.params.wfID)
    .then(function(webFolio){
        var certificate = {
            name: req.body.name,
            organization: req.body.organization,
            icon: req.body.icon,
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
    db.WebFolio.findOneAndUpdate({_id: req.params.wfID, "certifications._id": req.params.CertID},
    {
        "$set":{
            "certifications.$.name": req.body.name,
            "certifications.$.organization": req.body.organization,
            "certifications.$.icon": req.body.icon,
            "certifications.$.year": req.body.year
        }
    },{new: true})
    .then(function(webFolio){
        res.send(webFolio.certifications.find(cert => cert._id == req.params.CertID));
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.certificatesDelete = function(req, res){
    db.WebFolio.findById(req.params.wfID)
    .then(function(webFolio){
        webFolio.certifications.pull(req.params.CertID)
        webFolio.save()
        console.log(webFolio.certifications);
        res.send(webFolio.certifications)
    })
    .catch(function(err){
        console.log(err)
    })
}



/// TODO:
// Add route in app.js