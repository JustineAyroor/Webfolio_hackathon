var express         = require('express')
var router          = express.Router()
var db              = require("../models")
var helpers         = require("../helpers/users")

router.route('/users')
    .get(helpers.showAllUsers) // All Users

router.route('/')
    .get(helpers.getUserSession)
router.route('/:id/edit')
    .get(helpers.editUser)
router.route('/:id')
    .get(helpers.showUserHome)
    .put(helpers.updateUser)
    .delete(helpers.deleteUser)

 module.exports = router;