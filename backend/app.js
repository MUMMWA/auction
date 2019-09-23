//Dependencies
const db = require('./DB/db');
const express = require('express');
const fs = require('fs')
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const authorization = require('./MiddleWare/authorization');
const userRouter = require('./Routes/userRouter');
const productRouter=require('./Routes/productRouter');
const paymentRouter = require('./Routes/paymentRouter');


//init
const port = process.port || 8888;
const app = express();
//Conf
app.disable('x-powered-by');

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('common', { stream: accessLogStream }));
app.use(helmet());
app.use(cors());
//custom middleware
app.use('/api/Users/protected', authorization);
app.use('/api/products/protected', authorization);
app.use('/api/payment', authorization);


//Routing
app.use('/api/Users', userRouter);
app.use('/api/products/protected', productRouter);
app.use('/api/payment',paymentRouter);


//Error handling
app.use(function (err, req, res, next) {
    res.status(404).send(err);
});

//Bootup
app.listen(port, () => console.log(`listening on port ${port}`));