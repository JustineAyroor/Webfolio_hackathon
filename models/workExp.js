var mongoose = require('mongoose')

var workExpSchema = new mongoose.Schema({
    name: String,
    stDate: String,
    eDate: String,
    isCurr: Boolean,
    jobTitle: String,
    jDesc:{
        jobDesc: [String],
        techUsed: [String]
    }
})

module.exports = mongoose.model("WorkExp",workExpSchema)
