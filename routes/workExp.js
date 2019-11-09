var express = require('express')
var router = express.Router()

router.get("/xyz", function(req, res){
    res.send("Sent xyz from work")
})

module.exports = router;