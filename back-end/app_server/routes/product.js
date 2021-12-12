var express = require('express');
var router = express.Router();
var controller = require('../controllers/product');
var auth = require('../../authenticate')
var multer = require('multer');

var Storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null, 'products')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: Storage })

router.get('/', controller.getProducts);

router.get('/:id', controller.getProductById);

router.post('/add', auth.isUser, auth.isAdmin, controller.addProduct);

router.delete('/delete/:id',auth.isUser,auth.isAdmin, controller.deleteProduct);

router.put('/edit/:id',auth.isUser,auth.isAdmin, controller.editProduct);

module.exports = router;