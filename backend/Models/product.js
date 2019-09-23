const mongoose = require('mongoose');


var productSchema = mongoose.Schema({
        name: String,
        description: String,
        start_time: Date,
        end_time: Date,
        images: [Object],
        bids: [{
            amount: Number,
            time: Date,
            user: {
                user_id: String,
                firstName: String,
                lastName: String,
                email: String
            }
        }],
        highest_bid: {
            amount: Number,
            time: Date,
            user: {
                user_id: String,
                firstName: String,
                lastName: String,
                email: String
            }
        }
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('product', productSchema);