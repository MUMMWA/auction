const express = require('express');
const bidsController = require('../Controllers/bids.controller');
const router = express.Router();

// Create a new Product
router.post('/', bidsController.bid);


module.exports = router;