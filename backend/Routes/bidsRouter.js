const express = require('express');
const bidsController = require('../Controllers/bids.controller');
const router = express.Router();

// Create a new Product
router.post('/', bidsController.bid);

// get users bids
router.get('', bidsController.getBids);

// get users winnings
router.get('/winnings', bidsController.getWinnings);

// get users product last bid
router.get('/product/:productId', bidsController.getLastBid);


module.exports = router;