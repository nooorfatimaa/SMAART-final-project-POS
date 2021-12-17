var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../../authenticate');
var user = require('../models/user')
const joi = require('joi')
// var Cashier = require('../models/cashier');
// var Admin = require('../models/admin');

const schema = joi.object({
    username: joi
    .string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30),
    password: joi.string().trim().min(6)
})

module.exports.index = function(req, res, next) {
    res.send(' user router working respond with a resource');
}

module.exports.login = function(req, res, next) {
    const result = schema.validate(req.body)
    if (!result.error) {
        user.findOne({username: req.body.username}).then((present) => {
            if (present) {
                var token = authenticate.getToken({ _id: req.user._id });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, token: token, status: 'You are successfully logged in!',user:req.user });
            } else {
                const error = new Error("User not present")
                res.status(422)
                next(error)    
            }
        })
       
    } else {
        res.send("Error")
        res.status(422)
        next(result.error)
    }

}


module.exports.signup = function(req,res,next){
    // const result = schema.validate(req.body)
    // if (!result.error){
    //     user.findOne({username: req.body.username}).then((found) => {
    //         if (found) {
    //             const error = new Error('user already present')
    //             res.status(409)
    //             next(error)
    //         } else {
          const result = schema.validate(req.body)
            if(!result.error){
                user.findOne({username:req.body.username}).then((result)=>{
                    if(result){
                        const error = new Error('User Already Present')
                        res.status(409)
                        next(error)
                    }
                })
            }
            else{
                user.register(new user({ username: req.body.username }),
                req.body.password, (err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                    } else {
                        if (req.body.name)
                            user.name = req.body.name;
                        if (req.body.role)
                            user.role = req.body.role;
                        if (req.body.counterNo)
                            user.counterNo = req.body.counterNo;
                        if (req.body.dOb)
                            user.dOb = req.body.dOb;
                        if (req.body.address)
                            user.address = req.body.address;
                        if (req.body.contactNo)
                            user.contactNo = req.body.contactNo;
                        if (req.body.picture)
                            user.picture = req.body.picture;
            
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ err: err });
                                return;
                            } else {
                                passport.authenticate('local')(req, res, () => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({ success: true, status: 'Registration Successful!' });
                                });
                            }
                        });
                    }
                });
            // }
        // })  
    } 
}
    // else {
    //     res.status(422)
    //     next(result.error)
    // }

// }



// module.exports.signup = function(req,res,next){
//     const result = schema.validate(req.body)
//     if (!result.error){
//         user.findOne({username: req.body.username}).then((found) => {
//             if (found) {
//                 const error = new Error('user already present')
//                 res.status(409)
//                 next(error)
//             } else {
//                 user.register(new user({ username: req.body.username }),
//                 req.body.password, (err, user) => {
//                     if (err) {
//                         res.statusCode = 500;
//                         res.setHeader('Content-Type', 'application/json');
//                         res.json({ err: err });
//                     } else {
//                         if (req.body.name)
//                             user.name = req.body.name;
//                         if (req.body.role)
//                             user.role = req.body.role;
//                         if (req.body.counterNo)
//                             user.counterNo = req.body.counterNo;
//                         if (req.body.dOb)
//                             user.dOb = req.body.dOb;
//                         if (req.body.address)
//                             user.address = req.body.address;
//                         if (req.body.contactNo)
//                             user.contactNo = req.body.contactNo;
//                         if (req.body.picture)
//                             user.picture = req.body.picture;
            
//                         user.save((err, user) => {
//                             if (err) {
//                                 res.statusCode = 500;
//                                 res.setHeader('Content-Type', 'application/json');
//                                 res.json({ err: err });
//                                 return;
//                             } else {
//                                 passport.authenticate('local')(req, res, () => {
//                                     res.statusCode = 200;
//                                     res.setHeader('Content-Type', 'application/json');
//                                     res.json({ success: true, status: 'Registration Successful!' });
//                                 });
//                             }
//                         });
//                     }
//                 });
//             }
//         })  
//     } else {
//         res.status(422)
//         next(result.error)
//     }

// }

