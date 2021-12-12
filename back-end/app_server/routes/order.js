var express = require('express');
var router = express.Router();
var controller = require('../controllers/order');
var auth = require('../../authenticate')

router.get('/',  auth.isUser,auth.isAdmin,controller.getOrders);

router.get('/:id',  auth.isUser,auth.isAdmin, controller.getOrderById);

router.post('/add',  auth.isUser,auth.isAdmin,controller.addOrder);

module.exports = router;