var express         = require('express')
var router          = express.Router()
var passport        = require("passport")
var db              = require("../models")

//Landing Route
router.get("/", function(req, res){
    res.render("landing");
});

//Login Route
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});


//Register Route
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   var newUser = new db.User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email, 
            age: req.body.age,
            avatar: req.body.avatar,
            phone: req.body.phone
        });
        console.log(req.body.password)
    if(req.body.adminCode === 'halkahalka1234'){
        newUser.isAdmin = true;
    }
    db.User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
        //    req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/home"); 
        });
    }); 
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
 });

module.exports = router;