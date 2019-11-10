var mongoose = require('mongoose')

var projectSchema = new mongoose.Schema({
    name: String,
    stDate: String,
    eDate: String,
    desc: String,
    link: String
})

module.exports= mongoose.model("Project", projectSchema)