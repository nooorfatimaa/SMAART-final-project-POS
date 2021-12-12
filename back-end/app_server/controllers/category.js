var mongoose = require('mongoose');
var Category = require('../models/category');

module.exports.getCategories = async (req, res, next) => {
    await Category.find({}, (err,categories) => {
        if(err) {
            return res.status(400).json(err)
        }
        if(!categories.length) {
            return res.status(200).json("Categories not found")
        }
        return res.status(200).json(categories)
    }).catch(err => console.log(err))
}

module.exports.getCategoryById = async (req, res, next) => {
    await Category.findById(req.params.id)
        .then((category) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(category);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.addCategory = (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'no input provided',
        })
    }
    const category = new Category(body)

    if (!category) {
        return res.status(400).json({error: err })
    }
    category.save().then(() => {
        return res.status(201).json({
            success: true,
            id: category._id,
            message: 'category created successfully',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'an error occured while creating category',
        })
    })
}

module.exports.deleteCategory = async (req, res, next) => {
    await Category.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
}

module.exports.editCategory = async (req, res, next) => {

    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Category.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        category.name = body.name
        category.code = body.code
        category.description = body.description
        category.picture = body.picture
        category.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: category._id,
                    message: 'category updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'category not updated!',
                })
            })
    })
}


    