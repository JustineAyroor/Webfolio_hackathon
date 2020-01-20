var express = require('express')
var router = express.Router()
var helpers = require("../helpers/certifications")

router.route("/:wfID")
    .post(helpers.pushCertificate)

router.route("/:wfID/:CertID")
    .get(helpers.certificatesView)
    .put(helpers.certificatesPut)
    .delete(helpers.certificatesDelete)


module.exports = router