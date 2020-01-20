var mongoose = require('mongoose')

var projectSchema = new mongoose.Schema({
    name: String,
    techBag: [String],
    eDate: String,
    desc: [String],
    imgLink: String,
    showLink: Boolean,
    link: String
})

module.exports = mongoose.model("Project",projectSchema)
