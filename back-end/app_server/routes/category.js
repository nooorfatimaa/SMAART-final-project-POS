var express = require('express');
var router = express.Router();
var controller = require('../controllers/category');
var auth = require('../../authenticate')
var multer = require('multer');

var Storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null, 'categories')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: Storage })

router.get('/', controller.getCategories);
router.get('/:id',controller.getCategoryById);

router.post('/add',  auth.isUser,auth.isAdmin, controller.addCategory);

router.delete('/delete/:id', auth.isUser,auth.isAdmin, controller.deleteCategory);

router.put('/edit/:id', auth.isUser,auth.isAdmin, controller.editCategory);

module.exports = router;