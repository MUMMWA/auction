const MongoClient = require('mongodb').MongoClient;
const credential = require('../config/credentials.json');
const dbURI = `mongodb+srv://${credential.db.userName}:${credential.db.password}@auctiontest-ul455.mongodb.net/auction?retryWrites=true&w=majority`;

const client = new MongoClient(dbURI);
let db;


module.exports = {
    init: function() {
        client.connect(function (err) {
            if (!err) {

                db = client.db('auction');
                const oneMinute = db.collection('products_expiry_1_min');
                const oneMinuteChangeStream = oneMinute.watch();
                oneMinuteChangeStream.on('change', next => {
                    console.log("change:::", next)
                    // process next document
                });

                const fiveMinute = db.collection('products_expiry_5_min');
                const fiveMinuteChangeStream = fiveMinute.watch();
                fiveMinuteChangeStream.on('change', next => {
                    console.log("change:::", next.documentKey._id)
                    // process next document
                });
            } else {
                console.log("an error connecting:: ", err);
            }

        });

    },
    add: function(minutes,id){
        if(minutes === 1){

            db.collection("products_expiry_1_min").insertOne({_id:id, "createdAt": new Date()});
        }
        if(minutes === 5){
            db.collection("products_expiry_5_min").insertOne({_id:id, "createdAt": new Date()});
        }
    }
};
//{"_id":{"$oid":"5d87cb2ee245c108d37dcfb4"},"images":[{"imageUrl":"https://i.ibb.co/NTjTbtN/Iphone.jpg"}],"name":"Screen","description":"This Screen is locked to Simple Mobile from Tracfone, which means this device can only be used on the Simple Mobile wireless network. ","start_time":{"$date":{"$numberLong":"1569164400000"}},"end_time":{"$date":{"$numberLong":"1571756400000"}},"createdAt":{"$date":{"$numberLong":"1569180462326"}},"updatedAt":{"$date":{"$numberLong":"1569281476211"}},"__v":{"$numberInt":"1"},"bids":[{"_id":{"$oid":"5d8955c4635722535d6b6c3e"},"amount":{"$numberInt":"777"},"time":{"$date":{"$numberLong":"1569281476203"}},"user":{"user_id":"5d895344b3ca77501b32d930","firstName":"James","lastName":"Alituhikya","email":"james.alituhikya@gmail.com"}}],"highest_bid":{"amount":{"$numberInt":"777"},"time":{"$date":{"$numberLong":"1569281476203"}},"user":{"user_id":"5d895344b3ca77501b32d930","firstName":"James","lastName":"Alituhikya","email":"james.alituhikya@gmail.com"}}}
/*
  {
  _id: {
    _data: '825D89809B000000012B022C0100296E5A1004693B90960EC349A2B616B1B2F1CF3D2346645F696400645D897EE109190B015FCB21AD0004'
  },
  operationType: 'delete',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1569292443 },
  ns: { db: 'auction', coll: 'products_expiry_1_min' },
  documentKey: { _id: 5d897ee109190b015fcb21ad }
}

  documentKey: { _id: 5d897ee109190b015fcb21ad }

change::: {
    _id: {
        _data: '825D896D03000000012B022C0100296E5A10049093031CB31848D8B07D80CD41ED12A246645F696400645D87CB2EE245C108D37DCFB40004'
    },
    operationType: 'delete',
        clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1569287427 },
    ns: { db: 'auction', coll: 'products' },
    documentKey: { _id: 5d87cb2ee245c108d37dcfb4 }
}
*/

/*
=============================== update example ================================
{
    _id: {
        _data: '825D896B71000000012B022C0100296E5A10049093031CB31848D8B07D80CD41ED12A246645F696400645D87CB2CE245C108D37DCFB00004'
    },
    operationType: 'replace',
        clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1569287025 },
    fullDocument: {
        _id: 5d87cb2ce245c108d37dcfb0,
            images: [ [Object] ],
            name: 'Screen',
            description: 'This Screen is locked to Simple Mobile from Tracfone, which means this device can only be used on the Simple Mobile wireless network. ',
            start_time: 2019-09-22T15:00:00.000Z,
            end_time: 2019-10-22T15:00:00.000Z,
            createdAt: 2019-09-22T19:27:40.326Z,
            updatedAt: 2019-09-23T23:10:51.020Z,
            __v: 8,
            bids: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object]
        ],
            highest_bid: { amount: 700, time: 2019-09-23T23:09:38.803Z, user: [Object] }
    },
    ns: { db: 'auction', coll: 'products' },
    documentKey: { _id: 5d87cb2ce245c108d37dcfb0 }
}
*/

