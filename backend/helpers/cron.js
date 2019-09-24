const cron = require("node-cron");
const Product = require('../Models/product');
const bidsController = require('../Controllers/bids.controller');

module.exports = {
    init: () => {
        cron.schedule("* * * * *", function () {
            console.log("running a task every minute");
            Product.find()
                .then(products => {
                    let date = new Date();
                    for (let p of products) {
                        console.log("================== ");
                        console.log("date ", date);
                        console.log("end time ", p.end_time);
                        console.log("difference ", date - p.end_time);
                        if( date - p.end_time > 0){
                            bidsController.sell(p);
                        }

                    }
                }).catch(err => {
                console.log("error in cron job", err);
            });
        });
    }
}
