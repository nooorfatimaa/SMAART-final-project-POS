var mongoose = require('mongoose');
var Orders = require('../models/orders');
//need to sort and aggregate orders by week days etc
module.exports.getDailySales = async (req, res, next) => {
    await Orders.find({},'orderNo total date').exec((err,sales) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!sales.length) {
            return res.status(200).json("sales not found")
        }
        return res.status(200).json(sales)
    }).catch(err => console.log(err))
}

module.exports.getWeeklySales = async (req, res, next) => {
    await Orders.find({},'orderNo total date').exec((err,sales) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!sales.length) {
            return res.status(200).json("sales not found")
        }
        return res.status(200).json(sales)
    }).catch(err => console.log(err))
}
  
module.exports.getMonthlySales = async (req, res, next) => {
    await Orders.find({},'orderNo total date').exec((err,sales) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!sales.length) {
            return res.status(200).json("sales not found")
        }
        return res.status(200).json(sales)
    }).catch(err => console.log(err))
}
  
module.exports.getTopSales = async (req, res, next) => {
    await Orders.find({},'orderNo total cart').exec((err,sales) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!sales.length) {
            return res.status(200).json("sales not found")
        }
        return res.status(200).json(sales)
    }).catch(err => console.log(err))
}
  
  