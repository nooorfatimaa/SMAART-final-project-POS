var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.getCashiers = async (req, res, next) => {
    await User.find({role: 'cashier'}, (err,cashiers) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!cashiers.length) {
            return res.status(200).json("Cashiers not found")
        }
        return res.status(200).json(cashiers)
    }).catch(err => console.log(err))
}

module.exports.getCashierById = async (req, res, next) => {
    await User.findById(req.params.id)
        .then((cashier) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cashier);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.addCashier = (req, res, next) => {
    User.create(req.body)
        .then((cashier) => {
            console.log('cashier added ', cashier);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cashier);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.deleteCashier = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
}

module.exports.editCashier = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await User.findOne({ _id: req.params.id }, (err, cashier) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'cashier not found!',
            })
        }
        cashier.name = body.name
        cashier.counterNo = body.counterNo
        cashier.password = body.password
        cashier.contactNo = body.contactNo
        cashier.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: cashier._id,
                    message: 'cashier updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'cashier not updated!',
                })
            })
    })
}


    