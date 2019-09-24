const Product = require('../Models/product');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            success: 0, msg: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        images: req.body.images
    });

    // Save Product in the database
    product.save()
        .then(data => {
            req.dbN.add(1,data._id);
            res.send({ success: 1, msg: "Product created successfully!" });
        }).catch(err => {
            res.status(500).send({
                success: 0, msg: err.message || "Something wrong while creating the product."
            });
        });
};

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

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            success: 0, msg: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        images: req.body.images
    }, { new: true })
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
                success: 0, msg: "Something wrong updating product with id " + req.params.productId
            });
        });
};


exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    success: 0, msg: "Product not found with id " + req.params.productId
                });
            }
            res.send({ success: 1, msg: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    success: 0, msg: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                success: 0, msg: "Could not delete product with id " + req.params.productId
            });
        });
};