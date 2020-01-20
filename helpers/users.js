var db = require("../models")

exports.showAllUsers = function(req,res){
    db.User.find()
    .then(function(allUsers){
        res.json(allUsers)
    })
    .catch(function(err){
        res.send("Something Went Wrong")
    })
}

exports.getUserSession = function(req,res){
    var user_id = res.locals.currentUser.id;
    console.log(user_id)
    res.redirect("/home/" + user_id);
}

exports.showUserHome = function(req,res){
    db.User.findById(req.params.id)
        .then(function(foundUser){
            db.WebFolio.findOne({user: req.params.id})
                .then(function(Wf){
                    if(Wf == undefined){
                        var isCreated = false
                        res.render("show", {user: foundUser, isCreated: isCreated});
                    }else{
                    var isCreated = true
                    res.render("show", {user: foundUser, isCreated: isCreated,wfid: Wf._id});
                    }
                })  
            })
        .catch(function(err){
            res.redirect("/");
        })
}

exports.editUser = function(req,res){
    db.User.findById(req.params.id)
    .then(function(foundUser){
        res.render("editUser", {user: foundUser});
    }) 
    .catch(function(err){
        if(err){
            // req.flash("error", "User Not Found");
            res.redirect("/");
        }
    }); 
}

exports.updateUser = function(req,res){
    db.User.findByIdAndUpdate(req.params.id, req.body.user, {new: true})
        .then(function(updatedUser){
            console.log("Passed the test");
            res.redirect("/home/" + updatedUser.id);
        })
        .catch(function(err){
            console.log("Failed the test");
            // req.flash("error", "User Not Found");
            res.redirect("/");
        })
}

exports.deleteUser = function(req,res){
    db.User.remove({_id: req.params.id})
    .then(function(){
        res.send("Deleted User Id: "+ req.params.id)
    })
    .catch(function(err){
        res.send("Error Deleting User Id: " + req.params.id)
    })
}