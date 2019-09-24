const Product = require('../Models/soldProducts');



// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send({ success: 1, msg: "", products: products });
        }).catch(err => {
            res.status(500).send({
                success: 0, msg: err.message || "Something wrong while retrieving products."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    success: 0, msg: "Product not found with id " + req.params.productId
                });
            }
            res.send({ success: 1, msg: "", product: product });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    success: 0, msg: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                success: 0, msg: "Something wrong retrieving product with id " + req.params.productId
            });
        });
};

