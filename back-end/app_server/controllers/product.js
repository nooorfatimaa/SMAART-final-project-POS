var mongoose = require('mongoose');
var Product = require('../models/product');
// var Category = require('../models/category');
// var Customer = require('../models/customer');
// var Cashier = require('../models/cashier');

module.exports.getProducts = async (req, res, next) => {
    await Product.find({}).populate('category').exec((err,products) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!products.length) {
            return res.status(200).json("Products not found") //change code to 404 when data added
        }
        return res.status(200).json(products)
    }).catch(err => console.log(err))
}

module.exports.getProductById = async (req, res, next) => {
    await Product.findById(req.params.id)
        .then((product) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.addProduct = (req, res, next) => {
    Product.create(req.body)
        .then((product) => {
            console.log('product added ', product);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));
}

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
        {   name: body.name,
            category: body.name,
            description: body.description,
            quantity: body.quantity, 
            price: body.price,
            picture: body.picture,
        }, 
        function(error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        }
    );
}
    // const body = req.body
    // if (!body) {
    //     return res.status(400).json({
    //         success: false,
    //         error: 'You must provide a body to update',
    //     })
    // }

    // await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    //     if (err) {
    //         return res.status(404).json({
    //             err,
    //             message: 'Movie not found!',
    //         })
    //     }
    //     movie.name = body.name
    //     movie.time = body.time
    //     movie.rating = body.rating
    //     movie
    //         .save()
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 id: movie._id,
    //                 message: 'Movie updated!',
    //             })
    //         })
    //         .catch(error => {
    //             return res.status(404).json({
    //                 error,
    //                 message: 'Movie not updated!',
    //             })
    //         })
    // })
// }
