var mongoose = require('mongoose');
var Admin = require('../models/admin');
var Product = require('../models/product');
var Category = require('../models/category');
var Customer = require('../models/customer');


module.exports.getProducts = async (req, res, next) => {
    await Product.find({}, (err,products) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }
        if(!products.length) {
            return res.status(200).json({success: false, error: "Products not found"}) //change code to 404 when data added
        }
        return res.status(200).json({success: true, data: products})
    }).catch(err => console.log(err))
}

module.exports.getCategories = async (req, res, next) => {
    await Category.find({}, (err,categories) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }
        if(!categories.length) {
            return res.status(200).json({success: false, error: "Categories not found"})
        }
        return res.status(200).json({success: true, data: categories})
    }).catch(err => console.log(err))
}

module.exports.getCustomers = async (req, res, next) => {
    await Customer.find({}, (err,customers) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }
        if(!customers.length) {
            return res.status(200).json({success: false, error: "Customers not found"})
        }
        return res.status(200).json({success: true, data: customers})
    }).catch(err => console.log(err))
}

module.exports.getCashiers = async (req, res, next) => {
    await Cashier.find({}, (err,cashiers) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }
        if(!cashiers.length) {
            return res.status(200).json({success: false, error: "Cashiers not found"})
        }
        return res.status(200).json({success: true, data: cashiers})
    }).catch(err => console.log(err))
}
// function(req, res, next) {
//     res.send('respond with a resource');
// }


// getMovies = async (req, res) => {
//     await Movie.find({}, (err, movies) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!movies.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }
//         return res.status(200).json({ success: true, data: movies })
//     }).catch(err => console.log(err))
// }

//sir rashid's method
// function(req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.setHeader('Access-Control-Allow-Credentials', true);

//     Product.find().sort('name').exec(function(error, results) {
// if (error) {
// return next(error);
// }
// // Respond with valid data
// res.json(results);
// });
// }