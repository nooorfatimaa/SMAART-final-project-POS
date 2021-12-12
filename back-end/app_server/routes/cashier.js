var express = require('express');
var router = express.Router();
var controller = require('../controllers/cashier');
var auth = require('../../authenticate')

router.get('/',auth.isUser , auth.isAdmin, controller.getCashiers);

router.get('/:id',auth.isUser, auth.isAdmin, controller.getCashierById);

router.post('/add',auth.isUser, auth.isAdmin, controller.addCashier);

router.delete('/delete/:id',auth.isUser, auth.isAdmin, controller.deleteCashier);

router.put('/edit/:id',auth.isUser,auth.isAdmin, controller.editCashier);

module.exports = router;