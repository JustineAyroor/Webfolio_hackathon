var express = require('express')
var router = express.Router()
var helpers = require('../helpers/webFolio')

router.route("/:user_id")
    .get(helpers.webFolioView)
   
router.route("/:user_id/Wf/")
    .get(helpers.WfFields)
    .post(helpers.createWf)
    .put(helpers.updateWfFields)

router.route("/:user_id/Wf/:wfID")
    .get(helpers.showWf)
    .put(helpers.updateBasicInf)

module.exports = router