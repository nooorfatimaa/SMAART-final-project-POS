var express = require('express');
var router = express.Router();
var controller = require('../controllers/sales');
var auth = require('../../authenticate')

router.get('/daily',  auth.isUser, auth.isAdmin, controller.getDailySales);
router.get('/weekly',  auth.isUser , auth.isAdmin, controller.getWeeklySales);
router.get('/monthly',  auth.isUser, auth.isAdmin , controller.getMonthlySales);
router.get('/top', auth.isUser, auth.isAdmin, controller.getTopSales);

module.exports = router;