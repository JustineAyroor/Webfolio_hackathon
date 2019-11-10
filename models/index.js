var mongoose = require("mongoose");
mongoose.set('debug', true)
//MongoDB Configuration
mongoose.connect('mongodb://justine:justine1234@ds241258.mlab.com:41258/heroku_vcgnwf9w',{useNewUrlParser:true});

mongoose.Promise = Promise; 

module.exports.User = require("./user")
module.exports.WebFolio = require("./webfolio")
module.exports.Education = require("./education")
module.exports.WorkExp = require("./workExp")
module.exports.Project = require("./project")