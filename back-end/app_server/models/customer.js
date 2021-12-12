var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  contactNo: {
    type: String,
    // required: false,
  },
  picture: {
    type: Buffer,
    // required: false,  //should be true when ar and face recognition is connected
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: false,
    },
  },
});

CustomerSchema.methods.addToCart = function (product) {
  let cart = this.cart;

  if (cart.items.length == 0) {
    cart.items.push({ productId: product._id, quantity: 1 });
    cart.totalPrice = product.price;
  } else {
    const doesExist = cart.items.findIndex((item) => {
      return (
        new String(item.productId).trim() == new String(product._id).trim()
      );
    });
    if (doesExist == -1) {
      cart.items.push({ productId: product._id, quantity: 1 });
      cart.totalPrice += product.price;
    } else {
      existingProduct = cart.items[doesExist];
      existingProduct.quantity += 1;
      cart.totalPrice += product.price;
    }
  }
  return this.save();
};

CustomerSchema.methods.removeFromCart = function (product) {
  let cart = this.cart;
  const doesExist = cart.items.findIndex((item) => {
    return new String(item.productId._id).trim() == new String(product._id).trim();
  });
  if (doesExist >= 0) {
    cart.totalPrice =
      cart.totalPrice - product.price * cart.items[doesExist].quantity;
    cart.items.splice(doesExist, 1);
    return this.save();
  }
};

CustomerSchema.methods.incrementProductItem = function (product) {
  const whichItem = this.cart.items.findIndex(item => {
    return new String(item.productId._id).trim() == new String(product._id).trim()
  })
  existingProduct = this.cart.items[whichItem]
  existingProduct.quantity += 1
  this.cart.totalPrice += product.price
  return this.save()
}

CustomerSchema.methods.decrementProductItem = function (product) {
  const whichItem = this.cart.items.findIndex(item => {
    return new String(item.productId._id).trim() == new String(product._id).trim()
  })
  existingProduct = this.cart.items[whichItem]
  existingProduct.quantity -= 1
  if (existingProduct.quantity <= 0) {
    this.cart.items.splice(whichItem, 1)
  }
  this.cart.totalPrice -= product.price
  return this.save()
}

CustomerSchema.methods.emptyCartContents = function () {
  let cart = this.cart;
  cart.items = [];
  cart.totalPrice = 0;
  return this.save();
};

module.exports = mongoose.model("Customer", CustomerSchema);
