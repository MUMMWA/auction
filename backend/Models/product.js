const mongoose = require('mongoose');


var productSchema = mongoose.Schema({
    name: String,
    description: String,
    start_time: Date,
    end_time: Date,
    images: [String]
},
    {
        timestamps: true
    });


module.exports = mongoose.model('product', productSchema);