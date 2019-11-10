var express = require('express')
var router = express.Router()
var helpers = require("../helpers/tskills")

router.route("/:id")
    .get(helpers.tskillsView)
    .post(helpers.tskillsPush)
    .put(helpers.tskillsPut)
    .delete(helpers.tskillsDelete)

module.exports = router
