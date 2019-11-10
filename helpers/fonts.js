var db = require("../models")

exports.getAllFonts = function(req, res){
    db.Fonts.find({})
    .then(function(fonts){
        res.send(fonts)
    })
    .catch(function(err){
        res.send(err)
    })
}