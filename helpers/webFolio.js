var db = require("../models")

exports.webFolioView = function(req, res){
    db.WebFolio.findOne({user: req.params.user_id}).populate("education").populate("workExp")
    .then(function(webfolio){
        res.json(webfolio)
    })
    .catch(function(err){
        res.send(err)
    })
}