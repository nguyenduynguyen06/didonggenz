const express = require('express');
const router = express.Router();
const cartController = require('../controller/CartController');


router.post('/addCart', cartController.addToCart);
module.exports = router;
