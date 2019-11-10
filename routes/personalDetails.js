var express = require('express')
var router = express.Router()
var helpers = require('../helpers/personalDetails')

router.route("/:id")
    .get(helpers.pdView)
    .post(helpers.pdPush)
    .put(helpers.pdPut)

module.exports = router;
