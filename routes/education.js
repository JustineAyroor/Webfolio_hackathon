var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/education")
// var WebFolio = require("../models/webfolio")
// var Education = require("../models/education")

router.route("/:wfID")
    .get(helpers.getWebFolioEdu)
    .post(helpers.createWebFolioEdu)

router.route("/:wfID/:eduID")
    .get(helpers.getOneWebFolioEdu)
    .put(helpers.updateWebFolioEdu)
    .delete(helpers.delWebFolioEdu)

module.exports = router;