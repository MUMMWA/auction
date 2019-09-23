const fs = require('fs');
const jwt = require('jsonwebtoken');


// PRIVATE and PUBLIC key
var privateKEY = fs.readFileSync('./config/private.key', 'utf8');
var publicKEY = fs.readFileSync('./config/public.key', 'utf8');

var i = 'MUM';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience// SIGNING OPTIONS

var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "30d",
    algorithm: "RS256"
};

sign = function (payload) {
    return jwt.sign(payload, privateKEY, signOptions);
}

var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "30d",
    algorithm: ["RS256"]
}

verify = function (token) {
    try {
        let vjwt = jwt.verify(token, publicKEY, verifyOptions);

        return true
    }
    catch (err) {
        //console.log(err);
        return false;
    }
}
decode = function (token) {
    return jwt.decode(token, { complete: true });
    //returns null if token is invalid
}

module.exports = { sign: sign, verify: verify, decode: decode }