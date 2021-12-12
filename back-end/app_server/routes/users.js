var express = require('express');
var passport = require('passport');
var router = express.Router();
var controller = require('../controllers/users');
var authenticate = require('../../authenticate');
var user = require('../models/user')


router.post('/login',passport.authenticate('local'), controller.login)
router.post('/signup', controller.signup)

module.exports = router;

