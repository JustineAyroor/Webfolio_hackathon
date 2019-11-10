var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/workExp")


router.route("/:wfID")
    .get(helpers.getWebFolioworkExp) // pass WF_ID 
    .post(helpers.createWebFolioworkExp) // pass WF_ID 

router.route("/:wfID/:workExpID")
    .get(helpers.getOneWebFolioworkExp) // pass WF_ID and workExpID
    .put(helpers.updateWebFolioworkExp) // pass WF_ID and workExpID
    .delete(helpers.delWebFolioworkExp) // pass WF_ID and workExpID

module.exports = router;