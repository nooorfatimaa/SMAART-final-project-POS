var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

CartSchema.methods.confirmCartContents = function (customer) {
  let cart = this.cart;
  let customerCart = customer.cart;
  let totalItems = customer.cart.items;
  for (i = 0; i < totalItems.length; i++) {
    cart.items[i] = customerCart.items[i];
  }
  cart.totalPrice = customerCart.totalPrice;
  return this.save();
};

module.exports = mongoose.model("Cart", CartSchema);
