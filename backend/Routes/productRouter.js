const express = require('express');
const productController = require('../Controllers/product.controller');
const router = express.Router();

// Create a new Product
router.post('/', productController.create);

// Retrieve all Products
router.get('/', productController.findAll);

// Retrieve a single Product with productId
router.get('/:productId', productController.findOne);

// Update with productId
router.put('/:productId', productController.update);

// Delete with productId
router.delete('/:productId', productController.delete);


module.exports = router;