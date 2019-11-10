var express = require('express')
var router = express.Router()
var helpers = require("../helpers/certifications")

router.route("/:id")
    .get(helpers.certificatesView)
    .post(helpers.pushCertificate)
    .put(helpers.certificatesPut)
    .delete(helpers.certificatesDelete)

module.exports = router