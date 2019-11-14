var express         = require('express')
var router          = express.Router()
var db              = require("../models")


// Show All Users
router.get("/users", function(req, res){
    db.User.find()
    .then(function(allUsers){
        res.json(allUsers)
    })
    .catch(function(err){
        res.send("Something Went Wrong")
    })
});

//Home Route
router.get("/", function(req, res){
    var user_id = res.locals.currentUser.id;
    console.log(user_id)
    res.redirect("/home/" + user_id);
});

router.get('/:id', function(req, res) {
    db.User.findById(req.params.id, function(err, foundUser){
       if(err){
           res.redirect("/");
       }else{
           db.WebFolio.findOne({user: req.params.id}, function(err,Wf){
               if(Wf == undefined){
                var isCreated = false
                res.render("show", {user: foundUser, isCreated: isCreated});
               }else{
                var isCreated = true
                res.render("show", {user: foundUser, isCreated: isCreated,wfid: Wf._id});
               }
           })
       }
    });
});

// User Update Routes
router.get("/:id/edit", function(req, res){
    db.User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "User Not Found");
            res.redirect("/");
        }
        res.render("editUser", {user: foundUser});
    });
});

router.put("/:id", function(req, res) {
    db.User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            console.log("Failed the test");
            req.flash("error", "User Not Found");
            res.redirect("/");
        }
        console.log("Passed the test");
        res.redirect("/home/" + updatedUser.id);
    });
});

router.delete("/:id", function(req,res){
    db.User.remove({_id: req.params.id})
    .then(function(){
        res.send("Deleted User Id: "+ req.params.id)
    })
    .catch(function(err){
        res.send("Error Deleting User Id: " + req.params.id)
    })
})

 module.exports = router;