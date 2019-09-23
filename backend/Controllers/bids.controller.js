const Product = require('../Models/product');
const User = require('../Models/user');

//Create new Product
exports.bid = async (req, res) => {

    // Request validation
    try {
        if (!req.body) {

            return res.status(400).send({
                success: 0, msg: "Payment content can not be empty"
            });
        }




        let product = await Product.findById(req.body.productId);

        let userBid = {
            amount: req.body.amount,
            time: new Date(),
            product: {
                product_id: req.body.productId,
                name: product.name,
                description: product.description
            }
        };

        let user = await User.findById(req.user.id);
        let productBid = {
            amount: req.body.amount,
            time: new Date(),
            user: {
                user_id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        };

        if (product.highest_bid === undefined || product.highest_bid.amount === undefined || product.highest_bid.amount < req.body.amount) {
            product.highest_bid = productBid;


        }

        if (product.bids === undefined) {
            product.bids = [userBid];
        } else {
            product.bids.push(productBid);
        }

        if (userBid.bids === undefined) {
            userBid.bids = [userBid];
        } else {
            user.bids.push(userBid);
        }


        product.save();
        user.save();
        res.send({success: 1, msg: "", product: product});


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
