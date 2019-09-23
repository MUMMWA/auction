const Product = require('../Models/product');

//Create new Product
exports.pay = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            success: 0, msg: "Payment content can not be empty"
        });
    }

    let product_id = req.body.product_id;

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
            res.send({ success: 1, msg: "Product created successfully!" });
        }).catch(err => {
        res.status(500).send({
            success: 0, msg: err.message || "Something wrong while creating the product."
        });
    });
};