var db = require("../models")

exports.webFolioView = function(req, res){
    db.WebFolio.findOne({user: req.params.user_id}).populate("education").populate("workExp").populate("user").populate("projects")
    .then(function(webfolio){
        res.json(webfolio)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.WfFields = function(req,res){
    db.User.findById(req.params.user_id)
        .then(function(user){
            db.WebFolio.findOne({user: req.params.user_id})
                .then(function(wf){
                    console.log(wf)
                    if(wf == null){
                        res.render("WfCreate", {user: user, page:"create"})
                    }else{
                        res.render("WfCreate", {user: user, page:"update"})
                    }                    
                })
                .catch(function(err){console.log(err);})
        })
        .catch(function(err){console.log(err)})
}

exports.updateBasicInf = function(req,res){
    db.WebFolio.findByIdAndUpdate(req.params.wfID, req.body, {new: true})
        .then(function(webFolio){
            res.json(webFolio);
        })
        .catch(function(err){console.log(err);})
}

exports.updateSF = function(req,res){
    db.WebFolio.findByIdAndUpdate(req.params.wfID, req.body, {new: true})
        .then(function(webFolio){
            res.json(webFolio);
        })
        .catch(function(err){console.log(err);})
}

exports.updateWfFields = function(req,res){
    db.WebFolio.findOne({user: req.params.user_id})
        .then(function(wfInfo){
            var data = {exclude: req.body.exclude, include: req.body.include};
            if(req.body.exclude == null){
                data = {exclude: [], include: req.body.include};
            }
            db.WebFolio.findByIdAndUpdate(wfInfo._id, data, {new: true})
            .then(function(updatedWF){
                res.json(updatedWF)
            })
            .catch(function(err){console.log(err);})
        })
        .catch(function(err){console.log(err);})
}

exports.createWf = function(req, res){
    console.log(req.body.exclude)
    db.User.findById(req.params.user_id)
    .then(function(user){
        db.WebFolio.create({
            user: user,
            exclude: req.body.exclude,
            include: req.body.include
        })
        .then(function(webFolio){
            // res.redirect("/api/webFolio/"+user._id+"/Wf/"+webFolio._id)
            res.json(webFolio)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.showWf = function(req,res){
    db.WebFolio.findById(req.params.wfID).populate({path: "user"}).populate({path: "education"}).populate({path: "workExp"}).populate({path: "project"})
    // db.WebFolio.findOne({user: req.params.user_id}).populate("education").populate("workExp").populate("user").populate("projects")
    .then(function(wf){
        res.render("defaultwebfolio", {wf:wf})
    })
    .catch(function(err){
        console.log(err)
    })  
}