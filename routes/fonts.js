var express = require("express")
var router = express.Router()
var helpers = require("../helpers/fonts")

router.route("/")
    .get(helpers.getAllFonts)

module.exports = router