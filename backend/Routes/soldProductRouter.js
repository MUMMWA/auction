const express = require('express');
const productController = require('../Controllers/soldProducts.controller');
const router = express.Router();


// Retrieve all Products
router.get('/', productController.findAll);

// Retrieve a single Product with productId
router.get('/:productId', productController.findOne);

module.exports = router;