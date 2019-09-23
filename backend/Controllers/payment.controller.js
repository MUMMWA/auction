const Product = require('../Models/product');
const User = require('../Models/user');

//Create new Product
exports.pay = async (req, res) => {
    // Request validation
    try {
    if (!req.body) {
        return res.status(400).send({
            success: 0, msg: "Payment content can not be empty"
        });
    }



        let product = await Product.findById(req.params.productId);

        if (!product) {
            let userBid = {
                amount: req.body.amount,
                time: new Date(),
                product: product
            };

            let productBid = {
                amount: req.body.amount,
                time: new Date(),
                user: res.user
            };

            if (product.highest_bid.amount < req.body.amount) {
                product.higest_bid = productBid
            }

            product.save();
            let user = await User.findById(res.user.id);
            user.bids.push(userBid);
            user.save();

            res.send({success: 1, msg: "", product: product});

        }else{
            return res.status(404).send({
                success: 0, msg: "Product not found with id " + req.params.productId
            });
        }

    } catch (err) {
           if (err.kind === 'ObjectId') {
               return res.status(404).send({
                   success: 0, msg: "Product not found with id " + req.params.productId
               });
           }
           return res.status(500).send({
               success: 0, msg: "Something wrong retrieving product with id " + req.params.productId
           });
    }
}
