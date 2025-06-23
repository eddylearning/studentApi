
const express = require('express')
const studentRoutes = require('./routes/api');
const userRoutes = require('./routes/userRoute');
const createError=require('http-errors');
const cors= require('cors');
const ratelimit= require('express-rate-limit')
const helmet=require('helmet')
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

// ✅ CORS config
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// ✅ Custom headers for Safari, mobile, strict CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json()); 

const limiter=ratelimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many requests, please try again after 60 minutes.',
})
app.use('/api', limiter);

  // routes am using
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

// // Handling 404 error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});
app.listen(process.env.PORT || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000');

});