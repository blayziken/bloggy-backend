// const path = require('path');
const express = require('express');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');

// const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/home');

const app = express();


// 1) GLOBAL MIDDLEWARES

// Serving static files
// app.use(express.static(`${__dirname}/public`));
// app.use(express.static(path.join(__dirname, 'public')));


// Body Parser, reading data from the body into req.body
app.use(express.json());
// app.use(cookieParser()); // middleware to parse cookie (*console.log(req.cookie))
app.use(express.urlencoded({ extended: true })); // middleware used to parse data coming from a FORM

// 3) ROUTES
app.use('/', homeRouter);

app.use('/users', userRouter);


// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// })


module.exports = app;
