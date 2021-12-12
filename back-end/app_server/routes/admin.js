var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');
var auth = require('../../authenticate')

router.get('/products' , auth.isUser, auth.isAdmin, controller.getProducts);
router.get('/categories', auth.isUser, auth.isAdmin ,controller.getCategories);
router.get('/customers', auth.isUser, auth.isAdmin ,controller.getCustomers);
router.get('/cashiers', auth.isUser, auth.isAdmin ,controller.getCashiers);

module.exports = router;

