const Product = require('../Models/product');
const User = require('../Models/user');
const SoldProduct = require('../Models/soldProducts');

//Create new Bid
module.exports.bid = async (req, res) => {

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

        if (user.bids === undefined) {
            user.bids = [userBid];
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
};

//Create new Bid
module.exports.getWinnings = async (req, res) => {

    // Request validation
    try {
        if (!req.body) {

            return res.status(400).send({
                success: 0, msg: "Payment content can not be empty"
            });
        }
        let user = await User.findById(req.user.id);

        res.send({success: 1, msg: "", products: user.winnings});


    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                success: 0, msg: "failed to get winnings"
            });
        }
        return res.status(500).send({
            success: 0, msg: "failed to get winnings"
        });
    }
};

//Create new Bid
module.exports.getBids = async (req, res) => {

    // Request validation
    try {
        if (!req.body) {

            return res.status(400).send({
                success: 0, msg: "Payment content can not be empty"
            });
        }
        let user = await User.findById(req.user.id);

        res.send({success: 1, msg: "", products: user.winnings});


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
};


//Auction expired
module.exports.sell = async (product) => {

    // Request validation
    try {

        console.log("there was" ,product);

      if(product.highest_bid ) {
          let user = await User.findById(product.highest_bid.user.user_id);
          console.log("user found", user);

          let sold = {
              amount: product.highest_bid.amount,
              time: product.highest_bid.time,
              product: {
                  user_id: product.highest_bid.user.user_id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
              }
          };
          if (user.winnings === undefined || user.winnings == null) {
              user.winnings = [sold];
          } else {
              user.winnings.push(sold);
          }

          user.save();
          console.log("product before sole", product);
          const soldProduct = new SoldProduct({
              name: product.name,
              description: product.description,
              start_time: product.start_time,
              end_time: product.end_time,
              images: product.images,
              bids: product.bids,
              highest_bid: product.highest_bid
          });
          console.log("product after ", soldProduct);
          // Save Product in the database
          soldProduct.save();

          //remove product from products
          product.remove();
      }else{
          console.log("there was no bid" ,product);
      }


    } catch (err) {
               console.log("Something went wrong",err );

        }
    };

