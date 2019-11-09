var mongoose = require('mongoose')

var educationScehma = new mongoose.Schema({
    name: String,
    stDate: String,
    eDate: String,
    isCurr: Boolean,
    major: String,
    gpa: String,
    courses: [
        {
            name: String,
            grade: String
        }
    ]
})

module.exports(educationScehma, "Education")