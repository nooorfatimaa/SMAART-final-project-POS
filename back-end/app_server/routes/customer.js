var express = require('express');
var router = express.Router();
var controller = require('../controllers/customer');
var multer = require('multer');
// var auth = require('../../authenticate')


var Storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null, 'customers')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: Storage })

router.get('/',controller.getCustomers);
router.get('/:id', controller.getCustomerById);

router.post('/add', upload.single('picture'), controller.addCustomer);

module.exports = router;
