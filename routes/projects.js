var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/project")


router.route("/:wfID")
    .get(helpers.getWebFolioProject) // pass WF_ID 
    .post(helpers.createWebFolioProject) // pass WF_ID 

router.route("/:wfID/:projectID")
    .get(helpers.getOneWebFolioProject) // pass WF_ID and projectID
    .put(helpers.updateWebFolioProject) // pass WF_ID and projectID
    .delete(helpers.delWebFolioProject) // pass WF_ID and projectID

module.exports = router;