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



      if(product.highest_bid ) {
          let user = await User.findById(product.highest_bid.user.user_id);

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
          const soldProduct = new SoldProduct({
              name: product.name,
              description: product.description,
              start_time: product.start_time,
              end_time: product.end_time,
              images: product.images,
              bids: product.bids,
              highest_bid: product.highest_bid
          });
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

module.exports.getLastBid =  async (req, res) => {

    // Request validation
    try {
        if (!req.body) {

            return res.status(400).send({
                success: 0, msg: "Payment content can not be empty"
            });
        }




        let product = await Product.findById(req.params.productId);
        console.log("product found", product);

        let bids = product.bids
             .filter(e => e.user.user_id === req.user.id)
             .sort(function(a, b) {
             a = new Date(a.time);
             b = new Date(b.time);
             return a>b ? -1 : a<b ? 1 : 0;
         });
        console.log("bids found", bids);

        if(bids.length > 0){
            res.send({success: 1, msg: "", bid: bids[0]});
        }else{
            res.send({success: 1, msg: "", bid: {amount:0}});
        }



    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                success: 0, msg: "Product not found with id " + req.params.productId
            });
        }
        console.log("error in last bid ", err);
        return res.status(500).send({
            success: 0, msg: "Something wrong retrieving product with id " + req.params.productId
        });
    }
};

