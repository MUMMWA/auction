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
    role:String,
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', function (next) {
    const passwordHash = cryptr.encrypt(this.password);

    this.password = passwordHash;
    let currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
})

userSchema.query.findUserByEmail = function (email) {
    return this.findOne({ email: email });
}
userSchema.query.findUserByEmailAndPassword = async function (email, password) {
    let user = await this.findOne({ email: email });
    if (user) {
        if (cryptr.decrypt(user.password) === password)
        {
            return user;
        }
    }

    return null;
}
module.exports = mongoose.model('User', userSchema);