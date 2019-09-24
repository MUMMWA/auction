export class ProductModel {
    _id: string;
    name: String;
    description: String;
    start_time: Date;
    end_time: Date;
    images: [object];
    bids: [{
        amount: Number,
        time: Date,
        user: {
            user_id: String,
            firstName: String,
            lastName: String,
            email: String
        }
    }];
    highest_bid: {
        amount: Number,
        time: Date,
        user: {
            user_id: String,
            firstName: String,
            lastName: String,
            email: String
        }
    }
}