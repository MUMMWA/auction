const express = require('express');
const productController = require('../Controllers/payment.controller');
const router = express.Router();

// Create a new Product
router.post('/', productController.pay);


module.exports = router;