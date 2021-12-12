var express = require("express");
var router = express.Router();
var controller = require("../controllers/cart");
var auth = require("../../authenticate");

router.get("/", controller.getCarts);

router.get("/:id", controller.getCartById);

router.post("/add", controller.addCart);

router.post("/remove", controller.removeCart);

router.post("/empty", controller.emptyCart);

router.post("/confirm", controller.confirmCart);

router.post("/increment", controller.incrementItem);

router.post("/decrement", controller.decrementItem);

module.exports = router;
