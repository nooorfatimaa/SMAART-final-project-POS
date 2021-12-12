var express = require('express');
var router = express.Router();
var multer = require('multer');
var controller = require('../controllers/qrhandler');


var Storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})


var upload = multer({ storage: Storage })


router.post('/uploadsingle',upload.single('picture'), controller.uploadsingle)
// router.post('/uploadmultiples',upload.array('picture',5), controller.uploadmultiple)
router.get('/getimage/:id', controller.getimage)
router.get('/', (req,res)=>{
    res.send("hiiii")
})




module.exports = router;