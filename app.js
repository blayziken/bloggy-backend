// const path = require('path');
const express = require('express');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/home');
const profileRouter = require('./routes/profileRoutes');
const AppError = require('./utils/appError')

const app = express();


// 1) GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // middleware used to parse data coming from a FORM

// 3) ROUTES
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/profile', profileRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})


module.exports = app;
