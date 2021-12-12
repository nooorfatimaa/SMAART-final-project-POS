var Cart = require("../models/cart");
const Product = require("../models/product");
const Customer = require("../models/customer");
const mongoose = require("mongoose");

module.exports.getCarts = async (req, res, next) => {
  await Cart.find({})
    .populate("customer")
    .populate("cart.items.productId")
    .exec((err, carts) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!carts.length) {
        return res.status(200).json("carts not found");
      }
      return res.status(200).json(carts);
    });
};

module.exports.getCartById = async (req, res, next) => {
  await Cart.findById(req.params.id)
    .then(
      (cart) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(cart);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

module.exports.addCart = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "no input provided",
    });
  } else {
    Customer.findById(body.customer)
      .then((cus) => {
        Product.findById(body.productId)
          .then((prod) => {
            cus
              .addToCart(prod)
              .then((result) => res.json(result))
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
};

module.exports.removeCart = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "no input provided",
    });
  } else {
    Customer.findById(body.customer).populate("cart.items.productId").then((cus) => {
      const product = cus.cart.items.filter((prod) => {
        return prod.productId._id == req.body.productId;
      });
      cus.removeFromCart(product[0].productId)
      res.json(cus)
      })
      .catch((err) => next(err));
  }
};

module.exports.incrementItem = (req, res, next) => {
  if (!req.body) {
    res.status(401).json("no input provided");
  } else {
    Customer.findById(req.body.customer)
      .populate("cart.items.productId")
      .then((cus) => {
        const product = cus.cart.items.filter((prod) => {
          return prod.productId._id == req.body.productId;
        });
        cus.incrementProductItem(product[0].productId);
        res.json(cus);
      })
      .catch((err) => next(err));
  }
};

module.exports.decrementItem = (req, res, next) => {
  if (!req.body) {
    res.status(401).json("no input provided");
  } else {
    Customer.findById(req.body.customer).populate("cart.items.productId").then((cus) => {
      const product = cus.cart.items.filter((prod) => {
        return prod.productId._id == req.body.productId;
      });
      cus.decrementProductItem(product[0].productId);
      res.json(cus); 
      })
      .catch((err) => next(err));
  }
};

module.exports.emptyCart = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "no input provided",
    });
  } else {
    Customer.findById(body.customer)
      .then((cus) => {
        cus
          .emptyCartContents()
          .then((cart) => res.json(cart))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
};

module.exports.confirmCart = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "no input provided",
    });
  } else {
    Customer.findById(body.customer)
      .then((cus) => {
        const newCart = new Cart({ customer: body.customer });
        newCart.confirmCartContents(cus);
        Product.find({
          _id: {
            $in: cus.cart.items.map((item) => item.productId),
          },
        })
          .then((prod) => {
            for (let [index, element] of prod.entries()) {
              element.decrementQuantity(cus.cart.items[index].quantity);
            }
            cus.emptyCartContents();
            res.json(prod);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
};
