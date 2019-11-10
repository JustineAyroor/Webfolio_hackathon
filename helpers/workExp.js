var db = require("../models")

exports.getWebFolioworkExp = function(req, res){
    db.WebFolio.findById(req.params.wfID).populate('workExp')
    .then(function(webFolio){
        res.send(webFolio.workExp)
    })
    .catch(function(err){
        res.send([]);
    })
}

exports.getOneWebFolioworkExp = function(req, res){
    db.WorkExp.findById(req.params.workExpID)
    .then(function(foundedDets){
        res.json(foundedDets);
    })
    .catch(function(err){console.log(err)}) 
}

exports.createWebFolioworkExp = function(req, res){
    
    db.WorkExp.create({
        name: req.body.name,
        stDate: req.body.stDate,
        eDate: req.body.eDate,
        isCurr: req.body.isCurr,
        jobTitle: req.body.jobTitle,
        jDesc:{
            jobDesc: req.body.jobDesc,
            techUsed: req.body.techUsed
        }
    })
    .then(function(workExpDets){
        db.WebFolio.findById(req.params.wfID) 
        .then(function(WFObj){
            WFObj.workExp.push(workExpDets)
            WFObj.save()
            .then(function(Wf){res.json(workExpDets)})
            .catch(function(err){console.log(err)})
        })
        .catch(function(err){console.log(err)})
    })
    .catch(function(err){console.log(err)})
}

exports.updateWebFolioworkExp = function(req, res){
    db.WorkExp.findByIdAndUpdate(req.params.workExpID, req.body, {new: true})
    .then(function(workExpIDShow){
        res.json(workExpIDShow)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.delWebFolioworkExp = function(req, res){
    db.WorkExp.findByIdAndRemove(req.params.workExpID)
    .then(function(workExpIDShow){
        res.json(workExpIDShow)
    })
    .catch(function(err){
        res.send(err)
    })
}