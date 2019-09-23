const express = require('express');
let User = require('../Models/user');
const router = express.Router();
const jwtHelper = require('../helpers/jwtHelper');


router.post('/signup', async function (req, res, next) {

    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: 'normal'
    });

    let existUser = await User.find().findUserByEmail(req.body.email);

    if (existUser && existUser.email != null) {
        res.json({ success: 0, msg: 'User with this email Already exist' });
    }
    else {
        user.save(function (err) {
            if (err) {
                console.log(err);
                res.json({ success: 0, msg: 'an error has occured' });
            }
            else {
                console.log('user saved succesfully');
                res.json({ success: 1, msg: 'saved sucessfully' });
            }

        })
    }
});

router.post('/findbyemail', async function (req, res, next) {
    let existUser = await User.find().findUserByEmail(req.body.email);

    if (existUser && existUser.email != null) {

        res.json({ success: 0, msg: 'User with this email Already exist' });
    }
    else {
        res.json({ success: 1, msg: 'User is not exist' });
    }
})

router.post('/signin', async function (req, res, next) {
    let existUser = await User.find().findUserByEmailAndPassword(req.body.email, req.body.password);
    if (existUser && existUser.email != null) {
        let payload = {
            id: existUser._id,
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            role: existUser.role
        };

        const token = await jwtHelper.sign(payload);
        console.log("payload: ",payload);

        res.json({
            success: 1, msg: 'User exist',
            user: { id: existUser._id, email: existUser.email, firstName: existUser.firstName, lastName: existUser.lastName, role: existUser.role, token: token,bids: existUser.bids }
        });
    }
    else {
        res.json({ success: 0, msg: 'User with email and password is not exist' });
    }
})

router.post('/protected', (req, res, next) => {
    res.json({ success: 1, msg: 'protected route authorized' });
})
module.exports = router;