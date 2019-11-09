var mongoose = require('mongoose')

var fontSchema = new mongoose.Schema({
    name: String
})

module.exports(fontSchema, "Fonts")