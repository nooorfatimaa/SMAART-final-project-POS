var fs = require('fs');
var Customer = require('../models/customer');
// var Product = require('../models/product');
// var Category = require('../models/category');

module.exports.getCustomers = async (req, res, next) => {
    await Customer.find({}).populate("cart.items.productId").exec((err, customer) => {
      if (err) {
          return res.status(400).json(err);
        }
        if (!customer.length) {
          return res.status(200).json("carts not found");
        }
        return res.status(200).json(customer);
    })
  }

module.exports.getCustomerById = async (req, res, next) => {
    await Customer.findById(req.params.id)
        .then((customer) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(customer);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.addCustomer = async (req,res,next)=>{
    var record = new Customer;
    record.picture = fs.readFileSync(req.file.path);
    //console.log(req.file.path)
    record.save((err,result)=>{
        //console.log(result)
        //res.send(record)
        res.send(result._id)
    }).catch((err)=>{
        console.log(err)
    })
}

// module.exports.addCustomerOld = (req, res, next) => {
//     const body = req.body
//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'no input provided',
//         })
//     }
//     const customer = new Customer(body)

//     if (!customer) {
//         return res.status(400).json({error: err })
//     }
//     customer.save().then(() => {
//         return res.status(201).json({
//             success: true,
//             id: customer._id,
//             message: 'customer created successfully',
//         })
//     }).catch(error => {
//         return res.status(400).json({
//             error,
//             message: 'an error occured while creating customer',
//         })
//     })
// }


  
