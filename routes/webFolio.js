var express = require('express')
var router = express.Router()
var helpers = require('../helpers/webFolio')

router.route("/:user_id")
    .get(helpers.webFolioView)

module.exports = router