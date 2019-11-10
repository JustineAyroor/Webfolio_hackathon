var express = require('express')
var app = express()
var mongoose        = require('mongoose')
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var passport        = require("passport")
var LocalStrategy   = require("passport-local")
var db              = require("./models")
var User            = require("./models/user")

var port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Lets Build at HACK-NJIT",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Landing Route
app.get("/", function(req, res){
    res.render("landing");
});

//Login Route
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});


//Register Route
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
   var newUser = new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email, 
            avatar: req.body.avatar,
            phone: req.body.phone
        });
        console.log(req.body.password)
    if(req.body.adminCode === 'halkahalka1234'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
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

//Home Route
app.get("/home", function(req, res){
    // res.send("This will be the Home Page");
    var user_id = res.locals.currentUser.id;
    console.log(user_id)
    res.redirect("/home/" + user_id);
});

app.get('/home/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
       if(err){
        //    req.flash("error", "User Profile Not Found");
           res.redirect("/");
       }
       res.render("show", {user: foundUser});
    });
});


// logout route
app.get("/logout", function(req, res){
    req.logout();
    // req.flash("success", "LOGGED YOU OUT!!");
    res.redirect("/");
 });

// routers 
var personalDetailsRoutes = require("./routes/personalDetails")
var educationRoutes = require("./routes/education")
var workExpRoutes = require("./routes/workExp")
var projectsRoutes = require("./routes/workExp")

app.use("/api/personalDetails", personalDetailsRoutes)
app.use("/api/education", educationRoutes)
app.use("/api/workExp", workExpRoutes)
app.use("/api/project", projectsRoutes)

app.get("/xyz", function(req, res){
    res.send("sent xyz from app")
})


app.listen(port, function(){
    console.log("App running")
})