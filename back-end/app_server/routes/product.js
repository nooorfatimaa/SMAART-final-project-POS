var express = require('express');
var router = express.Router();
var controller = require('../controllers/product');
var auth = require('../../authenticate')
var multer = require('multer');
const Product = require('../models/product');
const fs = require('fs')
var path = require('path');

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

router.post('/add', upload.single('file'), (req,res)=>{
    console.log(req.file.path)
    let prod = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        picture: req.file.path
    })
    prod.save().then((result) => {
        res.json(result._id)
        const name = req.file.filename
        fs.rename(`products/${name}`, `products/${result._id}.png`, () => {
            console.log("\nFile Renamed!\n")});
        // const name = fs.lstatSync(path.join('/products', req.file.filename))
        console.log("Original Name of the file:",name)
    
    }).catch(err => console.log(err))
});

// router.post('/add', auth.isUser, auth.isAdmin, controller.addProduct);

router.delete('/delete/:id',auth.isUser,auth.isAdmin, controller.deleteProduct);

router.put('/edit/:id', controller.editProduct);

router.get('/cat/:name', controller.getProductsByCategory)

module.exports = router;