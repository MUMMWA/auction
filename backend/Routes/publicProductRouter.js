const express = require('express');
const productController = require('../Controllers/product.controller');
const router = express.Router();

router.get('/', productController.findAll);

module.exports = router;