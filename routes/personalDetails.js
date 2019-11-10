var express = require('express')
var router = express.Router()
var helpers = require('../helpers/personalDetails')

router.route("/:id")
    .get(helpers.pdView) // pass in webfolio id
    .post(helpers.pdPush) // pass in user id
    .put(helpers.pdPut) // pass webfolio id

module.exports = router;
