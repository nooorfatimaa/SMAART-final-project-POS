var mongoose = require('mongoose');
var Order = require('../models/orders');

module.exports.getOrders = async (req, res, next) => {
  await Order.find({}).populate('cart').exec((err,orders) => {
      if(err) {
          return res.status(400).json(err)
      }
      if(!orders.length) {
          return res.status(200).json("orders not found")
      }
      return res.status(200).json(orders)
  }).catch(err => console.log(err))
}

module.exports.getOrderById = async (req, res, next) => {
  await Order.findById(req.params.id)
      .then((order) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(order);
      }, (err) => next(err))
      .catch((err) => next(err));
}

module.exports.addOrder = (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'no input provided',
        })
    }
    const order = new Order(body)

    if (!order) {
        return res.status(400).json({error: err })
    }
    order.save().then(() => {
        return res.status(201).json({
            success: true,
            id: order._id,
            message: 'order created successfully',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'an error occured while creating order',
        })
    })
}