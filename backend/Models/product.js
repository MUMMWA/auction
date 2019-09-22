const mongoose = require('mongoose');


var productSchema = mongoose.Schema({
    name: String,
    description: String,
    start_time: Date,
    end_time: Date,
    images: [String],
    created_at: Date,
    updated_at: Date
});

productSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
})


module.exports = mongoose.model('product', productSchema);