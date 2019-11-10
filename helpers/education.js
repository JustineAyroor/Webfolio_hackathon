var db = require("../models")

exports.getWebFolioEdu = function(req, res){
    db.WebFolio.findById(req.params.wfID).populate('education')
    .then(function(webFolio){
        res.send(webFolio.education)
    })
    .catch(function(err){
        res.send([]);
    })
}

exports.getOneWebFolioEdu = function(req, res){
    db.Education.findById(req.params.eduID)
    .then(function(foundedDets){
        res.json(foundedDets);
    })
    .catch(function(err){console.log(err)}) 
}

exports.createWebFolioEdu = function(req, res){
    var courses = (req.body.courses).split(",")
    console.log(courses)
    db.Education.create({
        name: req.body.name,
        stDate: req.body.stDate,
        eDate: req.body.eDate,
        isCurr: req.body.isCurr,
        major: req.body.major,
        gpa: req.body.gpa,
        courses: courses})
    .then(function(eduDets){
        db.WebFolio.findById(req.params.wfID) 
        .then(function(WFObj){
            WFObj.education.push(eduDets)
            WFObj.save()
            .then(function(eduDets){res.json(eduDets)})
            .catch(function(err){console.log(err)})
        })
        .catch(function(err){console.log(err)})
    })
    .catch(function(err){console.log(err)})
}

exports.updateWebFolioEdu = function(req, res){
    db.Education.findByIdAndUpdate(req.params.eduID, req.body)
    .then(function(EduIdShow){
        res.json(EduIdShow)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.delWebFolioEdu = function(req, res){
    db.Education.findByIdAndRemove(req.params.eduID)
    .then(function(EduIdShow){
        res.json(EduIdShow)
    })
    .catch(function(err){
        res.send(err)
    })
}
