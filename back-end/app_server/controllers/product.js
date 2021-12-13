var mongoose = require('mongoose');
var Product = require('../models/product');

module.exports.getProducts = async (req, res, next) => {
    await Product.find({}).populate('category').exec((err,products) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!products.length) {
            return res.status(404).json("Products not found") //change code to 404 when data added
        }
        return res.status(200).json(products)
    }).catch(err => console.log(err))
}

module.exports.getProductById = async (req, res, next) => {
    await Product.findById(req.params.id).populate('category')
        .then((product) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));
}

// module.exports.addProduct = (req, res, next) => {
//     Product.create(req.body)
//         .then((product) => {
//             console.log('product added ', product);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(product);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// }

module.exports.deleteProduct = async (req, res, next) => {
    await Product.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
}

module.exports.editProduct = async (req, res, next) => {
    await Product.findOneAndUpdate(
        { _id: req.params.id }, 
        {  // name: body.name,
            // category: body.name,
            // description: body.description,
            quantity: req.body.quantity, 
            price: req.body.price,
            // picture: body.picture,
        }, 
        function(error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        }
    );
}

module.exports.getProductsByCategory = async (req, res, next) => {
   const catName = req.params.name
   Product.find({}).populate('category').then(prod => {
       const result = prod.filter(one => {
        return one.category.name == catName
       })
       res.json(result)
   }).catch(err => next(err))

}
