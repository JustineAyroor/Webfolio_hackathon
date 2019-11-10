var db = require("../models")

exports.getWebFolioProject = function(req, res){
    db.WebFolio.findById(req.params.wfID).populate('project')
    .then(function(webFolio){
        res.send(webFolio.project)
    })
    .catch(function(err){
        res.send([]);
    })
}

exports.getOneWebFolioProject = function(req, res){
    db.Project.findById(req.params.projectID)
    .then(function(foundedDets){
        res.json(foundedDets);
    })
    .catch(function(err){console.log(err)}) 
}

exports.createWebFolioProject = function(req, res){
    db.Project.create({
        name: req.body.name,
        stDate: req.body.stDate,
        eDate: req.body.eDate,
        isCurr: req.body.isCurr,
        desc: req.body.desc,
        link: req.body.link
    })
    .then(function(projectDets){
        db.WebFolio.findById(req.params.wfID) 
        .then(function(WFObj){
            WFObj.project.push(projectDets)
            WFObj.save()
            .then(function(Wf){res.json(projectDets)})
            .catch(function(err){console.log(err)})
        })
        .catch(function(err){console.log(err)})
    })
    .catch(function(err){console.log(err)})
}

exports.updateWebFolioProject = function(req, res){
    db.Project.findByIdAndUpdate(req.params.projectID, req.body, {new: true})
    .then(function(projectIDShow){
        res.json(projectIDShow)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.delWebFolioProject = function(req, res){
    db.Project.findByIdAndRemove(req.params.projectID)
    .then(function(projectIDShow){
        res.json(projectIDShow)
    })
    .catch(function(err){
        res.send(err)
    })
}