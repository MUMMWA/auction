const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('#!myTotalySecretKey!#');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date,
    updatedAt: Date,
    bids: [{
        amount: Number,
        time: Date,
        product: {
            product_id: String,
            name: String,
            description: String,
            images: [Object]
        }
    }],
    winnings: [
        {
            amount: Number,
            time: Date,
            product: {
                product_id: String,
                name: String,
                description: String,
                images: [Object]
            }
        }
    ]
});

userSchema.pre('save', function (next) {
    
    let currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    if (!this.password) {
        const passwordHash = cryptr.encrypt(this.password);
        this.password = passwordHash;
    }
    next();
});

userSchema.query.findUserByEmail = function (email) {
    return this.findOne({ email: email });
};
userSchema.query.findUserByEmailAndPassword = async function (email, password) {
    let user = await this.findOne({ email: email });
    if (user) {
        if (cryptr.decrypt(user.password) === password) {
            return user;
        }
    }

    return null;
};
module.exports = mongoose.model('User', userSchema);