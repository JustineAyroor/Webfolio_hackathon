var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/education")
// var WebFolio = require("../models/webfolio")
// var Education = require("../models/education")

router.route("/:wfID")
    .get(helpers.getWebFolioEdu) // pass WF_ID 
    .post(helpers.createWebFolioEdu) // pass WF_ID 

router.route("/:wfID/:eduID")
    .get(helpers.getOneWebFolioEdu) // pass WF_ID and Edu_ID
    .put(helpers.updateWebFolioEdu) // pass WF_ID and Edu_ID
    .delete(helpers.delWebFolioEdu) // pass WF_ID and Edu_ID

module.exports = router;