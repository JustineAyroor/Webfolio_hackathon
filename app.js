var express = require('express')
var app = express()
var mongoose        = require('mongoose')
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var passport        = require("passport")
var LocalStrategy   = require("passport-local")
var db              = require("./models")

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
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/stylesheets"));

 // Add font route
 app.post("/font", function(req, res){
     db.Fonts.create({name: req.body.font_name})
     .then(function(font){
         res.send("Font added "+font)
     })
     .catch(function(err){
         res.send(err)
     })
 })

 app.get("/:id/createWf", function(req, res){
    db.Fonts.find({})
    .then(function(fonts){
        res.render("WfCreate", {fonts: fonts})
    })
})

app.post("/:id/createWf", function(req, res){
    res.send("Logic Goes Here")
})

app.get("/:id/viewWf/:wfID", function(req, res){
    db.WebFolio.findById(req.params.wfID).populate({path: "user"}).populate({path: "education"}).populate({path: "workExp"}).populate({path: "project"})
    .then(function(wf){
        res.render("defaultwebfolio", {wf:wf})
    })
    .catch(function(err){
        console.log(err)
    })    
})


// routers 
var indexRoutes = require("./routes/index")
var userRoutes = require("./routes/user")
var personalDetailsRoutes = require("./routes/personalDetails")
var educationRoutes = require("./routes/education")
var webFolioRoutes = require("./routes/webFolio")
var workExpRoutes = require("./routes/workExp")
var projectsRoutes = require("./routes/projects")
var tskillRoutes = require("./routes/tskills")
var certificationRoutes = require("./routes/certifications")
var fontsRoutes = require("./routes/fonts")

app.use("/", indexRoutes)
app.use("/home", userRoutes)
app.use("/api/personalDetails", personalDetailsRoutes)
app.use("/api/webFolio", webFolioRoutes)
app.use("/api/education", educationRoutes)
app.use("/api/workExp", workExpRoutes)
app.use("/api/project", projectsRoutes)
app.use("/api/tskill", tskillRoutes)
app.use("/api/certifications", certificationRoutes)
app.use("/api/fonts", fontsRoutes)

app.get("/show", function(req, res){
    res.render("WfCreate")
})

app.post("/pdCreate", function(req, res){
    db.User.findById(res.locals.currentUser._id)
    .then(function(user){
        db.WebFolio.create({
            user: user,
            title: req.body.title,
            objective: req.body.objective,
            linkdn: req.body.linkdn,
            git: req.body.git,
            basic_wf_styles:{
                font_body: req.body.font_body,
                font_title: req.body.font_title,
                font_header: req.body.font_header,
                font_quotes: req.body.font_quotes
            }
        })
        .then(function(webFolio){
            res.redirect("/"+user._id+"/viewWf/"+webFolio._id)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
})


// Edudcation Route
app.get("/createEducation/:wfID", function(req, res){
    console.log(req.params.wfID)
    res.render("createEducation", {wfID: req.params.wfID})
})

app.post("/createEducation/:wfID", function(req, res){
    var courses = (req.body.courses).split(",")
    console.log(req.params.wfID)
    db.Education.create({
        name: req.body.name,
        stDate: req.body.stDate,
        eDate: req.body.eDate,
        isCurr: req.body.isCurr,
        major: req.body.major,
        gpa: req.body.gpa,
        courses: courses
    })
    .then(function(education){
        db.WebFolio.findById(req.params.wfID)
        .then(function(webFolio){
            webFolio.education.push(education)
            webFolio.save()
            .then(function(webFolio){
                res.redirect("/"+res.locals.currentUser._id+"/viewWf/"+webFolio._id)
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
})

// Parser Route
app.post("/fetch_data/:user_id", function(req, res){
    console.log(req.body)
    res.render("createFromParse", {parserObj: req.body})
    // res.redirect("/fetch_data", {parserObj: req.body, user_id: req.params.user_id})
})

app.get("/fetch_data", function(req, res){
    console.log(req.body)
    res.render("createFromParse", {parserObj: req.body.parserObj, user_id: req.body.user_id})
})

app.listen(port, function(){
    console.log("App running")
})