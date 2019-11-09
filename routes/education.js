var express = require('express')
var router = express.Router()

router.get("/xyz/:message", function(req, res){
    res.send("Sent xyz from education "+req.params.message)
})

module.exports = router;