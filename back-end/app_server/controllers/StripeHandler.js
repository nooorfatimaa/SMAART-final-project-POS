const stripe = require('stripe')('sk_test_51K4hcKASrElzPBPwH5Y4fsH4tTfoqnqE7LJykjzEwG0kuXP3Mz9E0lycyDnB19ZUV5UV4u0jygFT1zFjnZRmEP6q00IRQ3nXEp');
const express = require('express');
const { token } = require('morgan');
var router = express.Router();
// const uuid = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');

router.post('/payment', (req,res)=>{
  //cpnstructing token
  const {prod, tok} = req.body;
  const idempontencyKey = uuidv4() //generated once keeps the track user isn't charged doubled.
  
  return stripe.customers.create({
    email: tok.email,
    source: tok.id,
  }).then(customer=>{
    stripe.charges.create({
      amount: prod.price * 100, //to get in dollars
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email, //from there all the fields are optional
      description: prod.name,
    },{idempontencyKey})
    res.json(customer)
  }).catch((err)=>{console.log(err)})
})

router.get('/', (req,res)=>{
  res.json("stripe route working...")
})

module.exports = router;
